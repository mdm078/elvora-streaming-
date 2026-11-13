# NEXORA Official Website

এটি NEXORA অ্যাপের অফিসিয়াল ওয়েবসাইটের প্রাথমিক প্রজেক্ট। এখানে কোনো ভিডিও প্লেয়ার বা স্ট্রিমিং নেই।

## Termux-এ চালানো

```bash
cd ~/nexora-official-website
python -m http.server 8080
```

তারপর ফোনের ব্রাউজারে `http://127.0.0.1:8080` খুলুন।

## APK ডাউনলোড চালু করা

এখনো APK তৈরি হয়নি, তাই Download বাটন ইচ্ছাকৃতভাবে বন্ধ। APK build ও test শেষ হলে:

1. `downloads` নামে ফোল্ডার তৈরি করুন।
2. যাচাইকৃত APK-টি `downloads/nexora-android.apk` নামে রাখুন।
3. `index.html`-এ Download button-কে নিচের লিংকে যুক্ত করুন:
   `<a class="button primary" href="downloads/nexora-android.apk" download>Download NEXORA</a>`
4. Version, file size, Android requirement, release date এবং SHA-256 checksum প্রকাশ করুন।

## প্রকাশের আগে অবশ্যই

- Privacy Policy ও Terms-এর draft নিজের বাস্তব অ্যাপ অনুযায়ী সম্পূর্ণ করুন।
- Support email যোগ করুন।
- APK-তে malware scan, install test এবং release signing করুন।
- Download link-এ শুধু নিজের verified release দিন।
- GitHub Pages/Netlify-তে deploy করে HTTPS চালু রাখুন।

## গুরুত্বপূর্ণ

এই ওয়েবসাইট নিজে APK তৈরি করে না। ওয়েবসাইটকে Android APK-তে মোড়ানো এবং NEXORA অ্যাপের আসল ফিচার তৈরি করা আলাদা ধাপ।