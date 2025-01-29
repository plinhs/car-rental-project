import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

const HomePage = ({setSearchedLocation , setSelectedDates}) => {
    return (
        <div>
            <Navbar />
            <Header setSearchedLocation={setSearchedLocation} setSelectedDates={setSelectedDates}/>
        </div>
    );
};

export default HomePage