"use client"

import { copyLink, useShare } from "@/utils/helpers";
import { IoLinkOutline, IoShareSocialOutline } from "react-icons/io5";

export default function ShareButtons(event) {

  const {shareEvent, isSharing} = useShare()

  return (
    <div className="">
      <h3 className="mt-4 text-lg font-medium">Bagikan Event</h3>
      <div className="mt-2 flex gap-2">
        <button onClick={copyLink} disabled={isSharing} className="p-2 bg-blue-400 text-white rounded-full">
          <IoLinkOutline className="size-6" />
        </button>
        <button onClick={() => shareEvent(event)} disabled={isSharing} className="p-2 bg-primary text-white rounded-full">
          <IoShareSocialOutline className="size-6" />
        </button>
      </div>
    </div>
  );
}
