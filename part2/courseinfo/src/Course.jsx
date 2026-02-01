
const Hearder = ({ course }) => {
  return <h1>{course}</h1>;
};
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part
          key={part.id ?? index}
          part={part.name}
          exercises={part.exercises}
        />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <p><b>total of {total} exercises</b></p>
  );
};


const Course = ({ course }) => {
  return (
    <div>
      <Hearder course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;