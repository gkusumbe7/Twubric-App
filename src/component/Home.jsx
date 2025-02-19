import { TiDelete } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BsSortNumericDown } from "react-icons/bs";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function Home() {
  const api =
    "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json";
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDateNumber, setStartDateNumber] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [endDateNumber, setEndDateNumber] = useState(null);

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(data);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const userDelete = (index) => {
    const updateData = data.filter((_, i) => i != index);
    setData(updateData);
    toast.success("Delet Successfully");
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    const dateObj = new Date(e.target.value);
    const dateNum = dateObj.getTime() / 1000;
    setStartDateNumber(dateNum);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    const dateObj = new Date(e.target.value);
    const dateNum = dateObj.getTime() / 1000;
    setEndDateNumber(dateNum);
  };

  function filterByDate() {
    const filterData = data.filter((items) => {
      return (
        items.join_date >= startDateNumber && items.join_date < endDateNumber
      );
    });
    console.log("Hellow");
    console.log(startDateNumber);
    console.log(endDateNumber);
    console.log(filterData);
    setData(filterData);
  }

  const sortByTScoreAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.total - b.twubric.total;
    });
    setData(sortedData);
  };
  const sortByTScoreDec = () => {
    const sortedData = [...data].sort((a, b) => {
      return b.twubric.total - a.twubric.total;
    });
    setData(sortedData);
  };
  const sortByfriendAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.friends - b.twubric.friends;
    });
    setData(sortedData);
  };

   const  sortByfriendDsc = () => {
      const sortedData = [...data].sort((a, b) => {
        return b.twubric.friends - a.twubric.friends;
      });

      setData(sortedData);
    };

  const sortByinfluenceAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.influence - b.twubric.influence;
    });
    setData(sortedData);
  };
   const sortByinfluenceDsc = () => {
      const sortedData = [...data].sort((a, b) => {
        return b.twubric.influence - a.twubric.influence;
      });

      setData(sortedData);
    };

  const sortBychirpinessAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.chirpiness - b.twubric.chirpiness;
    });
    setData(sortedData);
  };

   const sortBychirpinessDsc = () => {
      const sortedData = [...data].sort((a, b) => {
        return b.twubric.chirpiness - a.twubric.chirpiness;
      });

      setData(sortedData);
    };
  return (
    <>
      {/* Nav */}
      <nav className="bg-blue-300 w-full fixed top-0 py-2 font-serif">
        <h1 className="text-2xl font-bold text-center  text-black ">
          TWUBRIC APP{" "}
          <FaTwitter className="inline mb-1 text-center mx-2 text-sky-600" />
        </h1>
      </nav>
      <section className="fixed  top-12 w-full flex flex-col justify-center px-1 md:py-3 bg-white  md:bg-blue-100 lg:flex-row md:flex-row flex-wrap    border-black">
        {/* filters Section */}

        <div className="flex gap-4 font-semibold  py-2 px-4 bg-blue-100  border-black text-black">
          <div class="flex gap-6 justify-center  flex-wrap">
            <div className="flex flex-col lg:flex-row md:flex-row text-md items-center">
              <h3>Twubric Score</h3>
              <div>
                <BsSortNumericDown
                  onClick={() => sortByTScoreAsc()}
                  className="inline text-xl border boxshadow-xl mr-1 p-0.5 hover:bg-orange-400"
                />
                <BsSortNumericDownAlt 
                  onClick={() => sortByTScoreDec()}
                  className="inline text-xl border boxshadow-xl p-0.5 hover:bg-orange-400"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row text-md items-center">
              <h3>Friends</h3>
              <div>
                <BsSortNumericDown
                  onClick={() => sortByfriendAsc()}
                  className="inline text-xl border boxshadow-xl mr-1 p-0.5 hover:bg-orange-400"
                />
                <BsSortNumericDownAlt
                  onClick={() => sortByfriendDsc()}
                  className="inline text-xl border boxshadow-xl p-0.5 hover:bg-orange-400"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row text-md items-center">
              <h3>Influence</h3>
              <div>
                <BsSortNumericDown
                  onClick={() => sortByinfluenceAsc()}
                  className="inline text-xl border boxshadow-xl mr-1 "
                />
                <BsSortNumericDownAlt
                  onClick={() => sortByinfluenceDsc()}
                  className="inline text-xl border boxshadow-xl p-0.5 hover:bg-orange-400"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row text-md items-center">
              <h3>Chirpiness</h3>
              <div>
                <BsSortNumericDown
                  onClick={() => sortBychirpinessAsc()}
                  className="inline text-xl border boxshadow-xl mr-1 p-0.5 hover:bg-orange-400"
                />
                <BsSortNumericDownAlt
                  onClick={() => sortByinfluenceDsc()}
                  className="inline text-xl border boxshadow-xl p-0.5  hover:bg-orange-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* filters Section */}
        <div className="bg-blue-50 md:bg-blue-100 md:p-1  flex flex-col lg:flex-row md:flex-row md:items-center justify-center flex-wrap items-center  border-black">
          <h1 className="font-bold text-[16px]  px-2 md:pb-2 ">
            Joined Twitter between :-
          </h1>
          <div className="flex flex-wrap gap-2 items-center text-[14px] p-1 ">
           
            <div className="flex ">
              <label htmlFor="startDate" className="font-semibold md:mr-1  ">
                Start Date :
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="text-black border w-9 md:w-auto boxshadow-xl px-2  rounded-md"
                onChange={handleStartDateChange}
              />
            </div>

           <div className="flex">
              <label htmlFor="endDate" className="font-semibold md:mr-1">End Date :</label>
              <input type="date" name="endDate" id="endDate"  className="text-black border  w-9 md:w-auto boxshadow-xl px-2 rounded-md"  onChange={handleEndDateChange} />
           </div>
                       
            <button
              className="text-md py-1 border border-gray-400 boxshadow-xl px-2 rounded-md hover:bg-red-200" 
              onClick={() => filterByDate()}
            >
              <FaSearch  />
            </button>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="mt-64 md:mt-28  pl-12 md:pl-24">
        <section className="p-1 md:p-5 items-center gap-2 font-semibold text-blue-400 flex flex-wrap">
          {data.map((data, index) => (
            <section
              className="bg-black hover:bg-gray-950 border py-3 rounded-md shadow-md flex flex-col gap-1 items-center"
              key={index}
            >
              <div className="flex md:gap-48 gap-24">
                <p className="text-2xl hover:text-3xl md:w-5">
                  <FaTwitter />
                </p>

                <button className="text-3xl" onClick={() => userDelete(index)}>
                  <TiDelete />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={data.image}
                  alt="img"
                  className="rounded-full w-24 shadow-xl p-1 bg-black hover:bg-yellow-500"
                />
                <p className="font-semibold text-xl my-1 text-center">
                  {data.fullname}
                </p>
                <p className="text-center text-gray-400 text-sm">
                  @{data.username}
                </p>
                <p className="text-md text-center">{data.twubric.total}</p>
              </div>

              <div className="flex items-center text-[15px] gap-[20px] p-4 text-gray-100">
                <div className=" flex flex-col items-center ">
                  <p className=" text-center">{data.twubric.friends}</p>
                  <label className="text-center">Friends</label>
                </div>

                <div className="flex flex-col items-center text-center">
                  <p className="text-center">{data.twubric.influence}</p>
                  <label className="text-center ">Influence</label>
                </div>

                <div className="flex flex-col items-center text-center">
                  <p className="text-center">{data.twubric.chirpiness}</p>
                  <label className="text-center">Chirpiness</label>
                </div>
              </div>
              <div className="flex gap-1 text-gray-400 text-sm font-normal">
                <label className="text-right">Joining Date:</label>
                <p className="">{convertTimestampToDate(data.join_date)}</p>
              </div>
            </section>
          ))}
        </section>
      </div>
    </>
  );
}

// fullname
// :
// "Sample User One"
// image
// :
// "https://randomuser.me/api/portraits/men/1.jpg"
// join_date
// :
// 1358899200
// twubric
// :
// chirpiness
// :
// 1.5
// friends
// :
// 1
// influence
// :
// 1
// total
// :
// 3.5
// [[Prototype]]
// :
// Object
// uid
// :
// 1
// username
// :
// "sampleuser1"
