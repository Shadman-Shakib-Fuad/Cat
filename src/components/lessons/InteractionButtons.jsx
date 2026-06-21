"use client";

import { useState } from "react";
import { FaHeart, FaBookmark, FaFlag } from "react-icons/fa";
import { FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { toast } from "react-toastify";

const reportReasons = [
  "Inappropriate content",
  "Spam or misleading",
  "Hate speech",
  "False information",
  "Other",
];

const InteractionButtons = ({ lesson }) => {
  // TODO: পরে Better Auth দিয়ে real user বসবে
  const user = null;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reportReason, setReportReason] = useState(reportReasons[0]);

  const handleLike = () => {
    if (!user) {
      toast.info("Please log in to like this lesson");
      return;
    }
    setLiked((prev) => !prev);
  };

  const handleSave = () => {
    if (!user) {
      toast.info("Please log in to save this lesson");
      return;
    }
    setSaved((prev) => !prev);
    toast.success(saved ? "Removed from favorites" : "Saved to favorites");
  };

  const handleReportSubmit = () => {
    // TODO: পরে lessonsReports collection এ POST করব
    toast.success("Lesson reported. Our team will review it.");
    document.getElementById("report_modal").close();
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex flex-wrap gap-3 my-6">
      <button onClick={handleLike} className={`btn ${liked ? "btn-secondary" : "btn-outline btn-secondary"}`}>
        <FaHeart /> {liked ? "Liked" : "Like"}
      </button>

      <button onClick={handleSave} className={`btn ${saved ? "btn-primary" : "btn-outline btn-primary"}`}>
        <FaBookmark /> {saved ? "Saved" : "Save to Favorites"}
      </button>

      <button
        onClick={() => document.getElementById("report_modal").showModal()}
        className="btn btn-outline btn-error"
      >
        <FaFlag /> Report
      </button>

      
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-circle btn-outline"
      >
        <FaFacebook />
      </a>
      
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${lesson.title}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-circle btn-outline"
      >
        <FaXTwitter />
      </a>
      
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-circle btn-outline"
      >
        <FaLinkedin />
      </a>

      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Report this lesson</h3>
          <select
            className="select select-bordered w-full mb-4"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          >
            {reportReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Cancel</button>
            </form>
            <button onClick={handleReportSubmit} className="btn btn-error text-white">
              Submit Report
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InteractionButtons;