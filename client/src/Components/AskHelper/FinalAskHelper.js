import { useEffect, useState } from "react";
import AskHelperMain from "./AskHelperMain";
import LoadingAnimation from "../../Assets/LoaderAnimation/LoaderAnimation";

const FinalAskHelperMain = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFeed = async(req, res) => {
      try{
        var responses = await fetch('https://coolab-server.onrender.com/api/full-feed', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        responses = await responses.json();
        
        setData(responses);
        setLoading(false);
      } catch(error){
        console.log(error);
      }
    }

    fetchFeed();
  }, []);

  if(loading){
    return (
      <LoadingAnimation/>
    )
  }
  return <AskHelperMain data={data} setData={setData} />;
};

export default FinalAskHelperMain;
