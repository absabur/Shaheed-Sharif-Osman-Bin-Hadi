"use client";
import { useState } from "react";
import {
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Home,
  Heart,
} from "lucide-react";
import BackSection from "@/components/common/BackSection";

export default function TributeForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "সাধারণ নাগরিক",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", relation: "সাধারণ নাগরিক", message: "" });
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      {/* Navigation and Breadcrumbs */}
      <BackSection
        links={[
          { path: "/", text: "", icon: <Home size={15} /> },
          {
            path: "/tributes",
            text: "শ্রদ্ধাঞ্জলি",
          },
        ]}
        current={`শ্রদ্ধাঞ্জলি জানান`}
      />

      {/* Page Heading */}
      <div className="mb-12 text-center lg:text-left">
        <h3 className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center justify-center lg:justify-start gap-2">
          <Heart size={12} fill="currentColor" /> হৃদয়ে ওসমান হাদী
        </h3>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          স্মৃতি ও <span className="text-red-700">শ্রদ্ধাঞ্জলি</span>
        </h2>
        <p className="text-zinc-500 mt-6 max-w-xl text-lg leading-relaxed">
          শহীদের স্মরণে আপনার অনুভূতি ব্যক্ত করুন। আপনার প্রতিটি শব্দ আমাদের
          ইতিহাসের অংশ হয়ে থাকবে।
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-12 mb-10 max-w-2xl mx-auto bg-zinc-950 rounded-[2.5rem] border border-white/5 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter">
            ধন্যবাদ!
          </h4>
          <p className="text-zinc-500 text-sm mb-8 px-10">
            আপনার শ্রদ্ধাঞ্জলিটি গ্রহণ করা হয়েছে। যাচাইয়ের পর এটি প্রকাশ করা
            হবে।
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            আরেকটি লিখুন (Write Another)
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 mb-12 w-full mx-auto p-8 w-full border border-white/5 rounded-[2.5rem] bg-zinc-950/50 backdrop-blur-sm"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">
              আপনার নাম
            </label>
            <div className="relative">
              <User
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700"
                size={18}
              />
              <input
                required
                type="text"
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-red-600 focus:bg-zinc-900 outline-none transition-all text-white placeholder:text-zinc-700"
                placeholder="নাম লিখুন..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">
              পরিচয় / সম্পর্ক
            </label>
            <select
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-red-600 outline-none cursor-pointer text-white appearance-none"
              value={formData.relation}
              onChange={(e) =>
                setFormData({ ...formData, relation: e.target.value })
              }
            >
              <option value="সাধারণ নাগরিক">সাধারণ নাগরিক</option>
              <option value="ছাত্র / সহপাঠী">ছাত্র / সহপাঠী</option>
              <option value="সহযোদ্ধা">সহযোদ্ধা</option>
              <option value="পরিবার">পরিবার</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">
              আপনার বার্তা
            </label>
            <div className="relative">
              <MessageSquare
                className="absolute left-5 top-5 text-zinc-700"
                size={18}
              />
              <textarea
                required
                rows={5}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-red-600 outline-none transition-all resize-none text-white placeholder:text-zinc-700"
                placeholder="আপনার শ্রদ্ধাঞ্জলি লিখুন..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-700 hover:text-white transition-all disabled:opacity-50 active:scale-[0.98] shadow-xl"
          >
            {loading ? (
              "প্রক্রিয়াধীন..."
            ) : (
              <>
                <Send size={14} /> বার্তা পাঠান
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
