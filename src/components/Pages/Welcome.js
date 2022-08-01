import Header from "../Layout/Header";

const Welcome = (props) => {
    return ( <div>
        <Header/>
        <span
        style={{
          fontFamily: "sans-serif",
          fontSize: "large",
          fontStyle: "italic",
        }}
      >
        Welcome to your mail box!!!
      </span>
    </div> );
}
 
export default Welcome;