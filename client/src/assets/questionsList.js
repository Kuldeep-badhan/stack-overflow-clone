var questionsList = [
    {
      _id: 1,
      upVotes: 4,
      downVotes: 2,
      noOfAnswers: 2,
      questionTitle: "question 1?",
      questionBody: "It meant to be",
      questionTags: ["java", "node js", "react js", "mongo db", "express js"],
      userPosted: "lano",
      userId: 1,
      askedOn: "jan 1",
      answer: [
        {
          answerBody: "Answer",
          userAnswered: "kumar",
          answeredOn: "jan 2",
          userId: 2,
        },
        {
          answerBody: "new answer",
          userAnswered: "vijay",
          answeredOn: "august 9",
          userId: 3,
        }
      ],
    },
    {
      _id: 2,
      upVotes: 3,
      downVotes: 2,
      noOfAnswers: 0,
      questionTitle: "question 2",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [
        {
          answerBody: "Answer",
          userAnswered: "kumar",
          answeredOn: "jan 2",
          userId: 2,
        },
      ],
    },
    {
      _id: 3,
      upVotes: 3,
      downVotes: 2,
      noOfAnswers: 0,
      questionTitle: "question 3",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [
        {
          answerBody: "Answer",
          userAnswered: "kumar",
          answeredOn: "jan 2",
          userId: 2,
        },
      ],
    },
  ];

  export default questionsList;