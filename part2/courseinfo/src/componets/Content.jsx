import Part from "./Part";
const Content = ({ parts  }) => {
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

export default Content;