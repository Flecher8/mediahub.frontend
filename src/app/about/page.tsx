"use client";

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-full max-w-md shadow-xl p-6 border border-accent">
        <h1 className="text-3xl font-bold mb-4 text-center">About</h1>
        <div className="space-y-2">
          <p className="text-lg">MediaHub</p>
          <p className="text-lg">Version: 1.0.0</p>
          <p className="text-lg">
            Developed by:
          </p>
          <p className="text-lg">
            Vladyslav Bocharov
          </p>
          <p className="text-lg">
            Dmytro Honchar
          </p>
          <p className="mt-12">
            On this site you will find all kinds of media content; it will allow
            you to find and store your media content in a collection. Most
            importantly, our proprietary recommendation algorithm will be able
            to provide you with content that you will truly appreciate.
          </p>
        </div>
      </div>
    </div>
  );
}
