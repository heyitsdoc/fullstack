import Hearder from "./componets/Header"
import Total from "./componets/Total"
import Content from "./componets/Content" 

const Course = ({ course }) => {
  return (
    <div>   
      <Hearder course={course.name} />
      <Content parts={course.parts}/>      
      <Total parts={course.parts} />
    </div>  
  );
};

export default Course;