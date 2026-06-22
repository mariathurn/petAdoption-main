// src/pages/faq.tsx

const faqs = [
  {
    question: "Why do I have to pay an adoption fee?",
    answer:
      "Adoption fees help cover veterinary costs, vaccinations, food, and shelter maintenance.",
  },
  {
    question:
      "I see some pets haven’t been neutered, microchipped, or vaccinated. Why?",
    answer:
      "Some pets come from backgrounds where these treatments were not provided. We prioritize their care upon arrival.",
  },
  {
    question: "Is your pet food all-natural and organic?",
    answer:
      "We provide high-quality food, but not all of it is organic. We focus on nutrition and health.",
  },
  {
    question: "Can you help me find a pet that’s not a dog or cat?",
    answer:
      "Right now, we only have dogs and cats available for adoption, but we truly appreciate your interest in other types of pets! As we grow, we hope to expand and welcome more animals into our adoption program.",
  },
];
// Defines a React functional component named Faq using an arrow function.
const Faq = () => {
  // Creates a variable holding common Tailwind classes for the FAQ block container:
  // border: adds a 1px border
  // border-gray-300: makes the border light gray
  // rounded-lg: gives it large rounded corners
  const wrapperClass = "border border-gray-300 rounded-lg";
  /* block: makes the element behave like a block (so it takes full width)
	  w-full: sets width to 100%
	  px-4 py-3: adds padding (horizontal = 1rem, vertical = 0.75rem)*/
  const questionClass =
    "block w-full text-left px-4 py-3 font-medium bg-white rounded-lg";
  //text-sm: smaller font size
  //text-gray-700: darkish gray for better readability
  const answerClass = "px-4 py-3 text-sm text-gray-700";
  //  This starts the JSX return block, where the HTML-like layout is returned to be rendered.
  return (
    //  min-h-screen: ensures full vertical screen height
    <div className="bg-blue-50 text-blue-900 font-sans rounded-lg min-h-screen">
      {/*Inner layout box: max-w-3xl: limits content width, mt-5: top margin,	px-4: horizontal padding*/}
      <div className="max-w-3xl mx-auto mt-5 px-4 rounded-lg">
        {/*text-3xl: big text,mb-8: margin below */}
        <h1 className="text-3xl font-bold text-center mb-8">
          FAQ’s for Adopting a Pet
        </h1>
        {/*Wrapper for all FAQ items: space-y-6: adds vertical space (1.5rem) between each child <div>*/}
        <div className="space-y-6">
          {/*Loops over the faqs array, creating a new <div> for each FAQ item*/}
          {/*key={index}: unique key for each item (using index as a fallback)*/}
          {/*wrapperClass: applies the common Tailwind classes defined above*/}
          {/*questionClass: applies the question-specific classes*/}
          {/*answerClass: applies the answer-specific classes*/}
          {faqs.map((faq, index) => (
            <div key={index} className={wrapperClass}>
              {/*Displays the question using the questionClass styles.*/}
              <label className={questionClass}>{faq.question}</label>
              <div className={answerClass}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Makes this component available for use, e.g. in a router.
export default Faq;
