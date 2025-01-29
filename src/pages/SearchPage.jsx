import Search from "../components/Search/Search";

const SearchPage = ({location,dates}) => {
  return (
    <div>
      <Search location={location} dates={dates}/>
    </div>
  );
};

export default SearchPage;