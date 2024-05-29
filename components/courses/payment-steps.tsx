import { Typography } from "../ui";

export const paymentSteps = [
  {
    id: 1,
    number: 1,
    description: <>আপনার পছন্দের কোর্সটিতে ক্লিক করুন</>,
  },
  {
    id: 2,
    number: 2,
    description: (
      <>
        কোর্সটিতে কোন প্রোমো কোড থাকলে{' '}
        <Typography color="primary600">"এপ্লাই প্রোমো কোড"</Typography> বাটনে
        ক্লিক করুন,
      </>
    ),
  },
  {
    id: 3,
    number: 3,
    description: (
      <>
        আপনার যদি লগইন করা না থাকে, সেক্ষেত্রে আপনার মোবাইল নাম্বার দিয়ে লগইন
        করুন,
      </>
    ),
  },
  {
    id: 4,
    number: 4,
    description: (
      <>
        আপনার যদি অ্যাকাউন্ট না থাকে, সেক্ষেত্রে আপনার মোবাইল নাম্বারে এসএমএস এর
        মাধ্যমে একটি ওটিপি পাঠানো হবে। ওটিপি বসিয়ে{' '}
        <Typography color="primary600">"এগিয়ে যান"</Typography> বাটনে ক্লিক করে
        সাইন আপ সম্পন্ন করুন
      </>
    ),
  },
  {
    id: 5,
    number: 5,
    description: (
      <>
        আপনার পছন্দের পেমেন্ট মেথডটি সিলেক্ট করে{' '}
        <Typography color="primary600">"পেমেন্ট সম্পন্ন করুন"</Typography> বাটনে
        ক্লিক করুন
      </>
    ),
  },
  {
    id: 6,
    number: 6,
    description: (
      <>
        পেমেন্ট সম্পন্ন হওয়ার পরে আপনাকে সরাসরি কোর্সের পেজে নিয়ে যাওয়া হবে।
        এরপর <Typography color="primary600"> "কোর্সটি শুরু করুন"</Typography>
        বাটনে ক্লিক করে শেখা শুরু করুন।
      </>
    ),
  },
];
