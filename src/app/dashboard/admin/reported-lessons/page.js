"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const initialReports = [
  {
    id: "r1",
    lessonId: "2",
    lessonTitle: "Letting Go of People Who Drain You",
    reportCount: 3,
    reports: [
      { reporter: "user1@example.com", reason: "Spam or misleading", timestamp: "2025-06-10" },
      { reporter: "user2@example.com", reason: "False information", timestamp: "2025-06-11" },
      { reporter: "user3@example.com", reason: "Inappropriate content", timestamp: "2025-06-12" },
    ],
  },
  {
    id: "r2",
    lessonId: "5",
    lessonTitle: "The Job I Didn't Get Saved My Career",
    reportCount: 1,
    reports: [
      { reporter: "user4@example.com", reason: "Hate speech", timestamp: "2025-06-15" },
    ],
  },
];

const ReportedLessonsPage = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDelete = (id) => {
    if (!confirm("Permanently delete this lesson?")) return;
    setReports((prev) => prev.filter((r) => r.id !== id));
    toast.success("Lesson deleted and reports cleared");
    setSelectedReport(null);
  };

  const handleIgnore = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    toast.success("Reports ignored — lesson kept live");
    setSelectedReport(null);
  };

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
                <tr key={r.id} className="border-t border-base-300">
                  <td className="font-medium">{r.lessonTitle}</td>
                  <td>
                    <span className="badge badge-error badge-sm">{r.reportCount} reports</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedReport(r)}
                        className="btn btn-xs btn-outline"
                      >
                        View Reasons
                      </button>
                      <button
                        onClick={() => handleIgnore(r.id)}
                        className="btn btn-xs btn-outline btn-warning"
                      >
                        Ignore
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete Lesson
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedReport && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">{selectedReport.lessonTitle} — Reports</h3>
            <div className="space-y-3">
              {selectedReport.reports.map((rep, idx) => (
                <div key={idx} className="bg-base-200 rounded-xl p-3 text-sm">
                  <p className="font-semibold">{rep.reporter}</p>
                  <p className="text-base-content/70">{rep.reason}</p>
                  <p className="text-xs text-base-content/50 mt-1">{rep.timestamp}</p>
                </div>
              ))}
            </div>
            <div className="modal-action">
              <button onClick={() => setSelectedReport(null)} className="btn">Close</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedReport(null)} />
        </dialog>
      )}
    </div>
  );
};

export default ReportedLessonsPage;