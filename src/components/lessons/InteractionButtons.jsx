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
   
    toast.success("Lesson reported. Our team will review it.");
    document.getElementById("report_modal").close();
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const facebookShareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;
  const twitterShareUrl =
    "https://twitter.com/intent/tweet?url=" + shareUrl + "&text=" + lesson.title;
  const linkedinShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + shareUrl;

  const likeBtnClass = liked ? "btn btn-secondary" : "btn btn-outline btn-secondary";
  const saveBtnClass = saved ? "btn btn-primary" : "btn btn-outline btn-primary";

  return (
    <div className="flex flex-wrap gap-3 my-6">
      <button onClick={handleLike} className={likeBtnClass}>
        <FaHeart /> {liked ? "Liked" : "Like"}
      </button>

      <button onClick={handleSave} className={saveBtnClass}>
        <FaBookmark /> {saved ? "Saved" : "Save to Favorites"}
      </button>

      <button
        onClick={() => document.getElementById("report_modal").showModal()}
        className="btn btn-outline btn-error"
      >
        <FaFlag /> Report
      </button>

      <a href={facebookShareUrl} target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
        <FaFacebook />
      </a>
      <a href={twitterShareUrl} target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
        <FaXTwitter />
      </a>
      <a href={linkedinShareUrl} target="_blank" rel="noreferrer" className="btn btn-circle btn-outline">
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