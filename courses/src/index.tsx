import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "Typescript";
  deadline: string
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string,
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Typescript",
      exerciseCount: 26,
      deadline: "2020-08-31"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
)

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map(part => <Part part={part} />)}
  </div>
)

const Total: React.FC<{ parts: {name: string; exerciseCount: number}[] }> = ({ parts }) => {
  const amount = parts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return <p>
    Number of exercises{" "}
    {amount}
  </p>
}

const Part: React.FC<{ part: CoursePart}> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p>
        <h3>{part.name}</h3> 
        Number of exercises: {part.exerciseCount} <br/>
        <i>{part.description}</i>
      </p>
    case "Using props to pass data":
      return <p>
        <h3>{part.name}</h3>
        Number of exercises: {part.exerciseCount} <br/>
        Group projects: {part.groupProjectCount}
      </p>
    case "Deeper type usage":
      return <p>
        <h3>{part.name}</h3>
        Number of exercises: {part.exerciseCount} <br/>
        <i>{part.description}</i> <br/>
        {part.exerciseSubmissionLink}
      </p>
    case "Typescript":
      return <p>
        <h3>{part.name}</h3>
        Number of exercises: {part.exerciseCount}<br/>
        Deadline: {part.deadline}
      </p>
    default:
      return assertNever(part)
  }
}



ReactDOM.render(<App />, document.getElementById("root"));