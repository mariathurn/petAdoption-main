const steps = [
  {
    img: "/adopt1.png",
    title: "Pick your fluffy friend",
    desc: "Go through our list of pets and pick the one you like",
  },
  {
    img: "/adopt2.png",
    title: "Apply via Email",
    desc: "Describe your home and routine so rehomers can see if it’s right for their pet",
  },
  {
    img: "/adopt3.png",
    title: "Wait for a response",
    desc: "We’ll get back to you as soon as possible with a decision",
  },
];

export default function Steps() {
  return (
    <section className="bg-white py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-10">
        Adopt a pet in just <br />
        <span className="text-green-600">3 Easy Steps</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center space-y-3"
          >
            <div className="text-3xl font-bold text-purple-700">{idx + 1}</div>
            <img src={step.img} className=" p-4 rounded-full"></img>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
