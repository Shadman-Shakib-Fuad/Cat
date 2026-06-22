"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ReportedLessonsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    apiFetch("/api/reports")
      .then((data) => {
        const grouped = {};
        data.forEach((r) => {
          const id = r.lessonId?._id;
          if (!id) return;
          if (!grouped[id]) {
            grouped[id] = {
              lessonId: id,
              lessonTitle: r.lessonId?.title,
              reports: [],
            };
          }
          grouped[id].reports.push(r);
        });
        setReports(Object.values(grouped));
      })
      .catch(() => toast.error("Failed to load reports"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (lessonId) => {
    if (!confirm("Permanently delete this lesson?")) return;
    try {
      await apiFetch(`/api/lessons/${lessonId}`, { method: "DELETE" });
      await apiFetch(`/api/reports/${lessonId}/ignore`, { method: "DELETE" });
      setReports((prev) => prev.filter((r) => r.lessonId !== lessonId));
      setSelectedLesson(null);
      toast.success("Lesson deleted and reports cleared");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleIgnore = async (lessonId) => {
    try {
      await apiFetch(`/api/reports/${lessonId}/ignore`, { method: "DELETE" });
      setReports((prev) => prev.filter((r) => r.lessonId !== lessonId));
      setSelectedLesson(null);
      toast.success("Reports ignored — lesson kept live");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">Reported Lessons</h1>
      <p className="text-base-content/60 text-sm mb-8">Review flagged content and take action.</p>

      {reports.length === 0 ? (
        <div className="text-center py-20 text-base-content/60">
          <p className="text-lg font-medium">No reported lessons. All clear!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Lesson Title</th>
                <th>Report Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.lessonId} className="border-t border-base-300">
                  <td className="font-medium">{r.lessonTitle}</td>
                  <td><span className="badge badge-error badge-sm">{r.reports.length} reports</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedLesson(r)} className="btn btn-xs btn-outline">View Reasons</button>
                      <button onClick={() => handleIgnore(r.lessonId)} className="btn btn-xs btn-outline btn-warning">Ignore</button>
                      <button onClick={() => handleDelete(r.lessonId)} className="btn btn-xs btn-outline btn-error">Delete Lesson</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedLesson && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">{selectedLesson.lessonTitle} — Reports</h3>
            <div className="space-y-3">
              {selectedLesson.reports.map((rep, idx) => (
                <div key={idx} className="bg-base-200 rounded-xl p-3 text-sm">
                  <p className="font-semibold">{rep.reporterUserId?.name || rep.reportedUserEmail}</p>
                  <p className="text-base-content/70">{rep.reason}</p>
                  <p className="text-xs text-base-content/50 mt-1">{new Date(rep.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <div className="modal-action">
              <button onClick={() => setSelectedLesson(null)} className="btn">Close</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedLesson(null)} />
        </dialog>
      )}
    </div>
  );
};

export default ReportedLessonsPage;