import { useEffect, useState } from "react";

const STORAGE_KEY = "eventify_demo_notice_seen_v1";

type Props = {
email?: string;
forceShow?: boolean; // overrides localStorage (useful for demos)
};

export default function DemoNotice({
// email = "moumni.zaiid@gmail.com",
forceShow,
}: Props) {
const [open, setOpen] = useState(false);

useEffect(() => {
const demoFlag = import.meta?.env?.VITE_DEMO_MODE === "true";
const shouldShow = demoFlag || forceShow || !localStorage.getItem(STORAGE_KEY);
if (shouldShow) setOpen(true);
}, [forceShow]);

const close = () => {
setOpen(false);
localStorage.setItem(STORAGE_KEY, "1");
};

if (!open) return null;

return (
<div aria-modal role="dialog" className="fixed inset-0 z-[1000] flex items-center justify-center">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true" />
    {/* Modal */}
    <div className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <div className="mb-3 flex items-start gap-3">
            <div
                className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center">
                ⚠️
            </div>
            <div>
                <h2 className="text-xl font-semibold">Demo Mode Enabled</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    To keep the public demo fast and reliable, <strong>backend services are
                        disabled</strong>. This UI shows <strong>preview data only</strong> (read-only).
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    For full access, collaboration, or questions, contact the owner.
                    {" "}
                    {/* <a href='https://zaiid.moumni.uk' className="font-medium text-purple-600 underline">
                        Zaiid Moumnii
                    </a> */}
                </p>
            </div>
        </div>

        {/* <div className="mt-5 flex items-center justify-end gap-2">
            <button onClick={close}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Got it
            </button>
            <a href='https://zaiid.moumni.uk'
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:text-black hover:bg-violet-700 ">
                Contact Owner </a>

        </div> */}

        {/* Close (X) */}
        <button onClick={close} aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            ✕
        </button>
    </div>
</div>
);
}
