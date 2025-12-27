import { useEffect, useState } from "react";
import axios from "axios";
//you can ignore this line as i'm exxperimenting with multiple github accounts
const LIMIT = 5;
const API = "http://localhost:3001/events";
//note : if you are having one account in the github and if you facing the below error to push the code from another account
// voltuswave@voltuswave-OptiPlex-7050:~/nrael/experiments/infinite scrolling$ git push origin master
//remote: Permission to Deathhacker110/Infinite-Scrolling.git denied to Kalyan-110.
//fatal: unable to access 'https://github.com/Deathhacker110/Infinite-Scrolling.git/': The requested URL returned error: 403

// do on thing add the current account as a collaborator to the main account repo then only you can push the code


function App() {
  const [apidata, setApidata] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (!hasMore) return
    const res = await axios.get(
      `${API}?_start=${page * LIMIT}&_limit=${LIMIT}`
    );

    setApidata(prev => [...prev, ...res.data]);

    if (res.data.length < LIMIT) {
      setHasMore(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      {apidata.map(item => (
        <div
          key={item.id}
          style={{ border: "1px solid black", margin: "20px", padding: "50px" }}
        >
          <h3>{item.title} {item.id}</h3>
          <p>{item.type}</p>
        </div>
      ))}

      {!hasMore && <p style={{ textAlign: "center" }}>No more data</p>}
    </div>
  );
}

export default App;
