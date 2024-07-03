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

  const sortByfriendAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.friends - b.twubric.friends;
    });
    setData(sortedData);
  };
  //   sortByfriendDsc = () => {
  //     const sortedData = [...data].sort((a, b) => {
  //       return b.twubric.friends - a.twubric.friends;
  //     });

  //     setData(sortedData);
  //   };

  const sortByinfluenceAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.influence - b.twubric.influence;
    });
    setData(sortedData);
  };
  //   sortByinfluenceDsc = () => {
  //     const sortedData = [...data].sort((a, b) => {
  //       return b.twubric.influence - a.twubric.influence;
  //     });

  //     setData(sortedData);
  //   };

  const sortBychirpinessAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.twubric.chirpiness - b.twubric.chirpiness;
    });
    setData(sortedData);
  };

  //   sortBychirpinessDsc = () => {
  //     const sortedData = [...data].sort((a, b) => {
  //       return b.twubric.chirpiness - a.twubric.chirpiness;
  //     });

  //     setData(sortedData);
  //   };
  return (
    <>
      {/* Nav */}
      <nav className="bg-blue-400 boxshadow-xl py-1">
        <h1 className="text-center font-bold text-white">
          TWUBRIC APP
          <FaTwitter className="inline mb-1   boxshadow-xl text-center mx-2 text-sky-50" />
        </h1>
      </nav>

      {/* filters Section */}
      <section >

      {/*   Joined Twitter Between */}
        <section className="border" >
          <h1 className="font-semibold ">Joined Twitter Between</h1>
          <div className="border flex justify-around bg-blue-50 font-semibold">

            <div className="border flex flex-col text-sm">
              <label htmlFor="startDate">Start Date :</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="w-28 p-0.5 rounded-xl"
                onChange={handleStartDateChange}
              />
            </div>
            <div className="border flex flex-col text-sm">
            <label htmlFor="endDate">End Date :</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="w-28"
              onChange={handleEndDateChange}
            />
            </div>
            
            <button onClick={() => filterByDate()}>
              <FaSearch />
            </button>
          </div>
        </section>

        <section>
          <h1 className="font-bold text-xl ">Sort Filter</h1>
          <div class="flex gap-3">
            <button className="text-[14px] md:text-md">
              Twubric Score
              <BsSortNumericDown onClick={() => sortByTScoreAsc()} />
              <BsSortNumericDownAlt />
            </button>
            <button className="text-[14px] md:text-md">
              Friends
              <BsSortNumericDown onClick={() => sortByfriendAsc()} />
              <BsSortNumericDownAlt onClick={() => sortByfriendDsc()} />
            </button>
            <button className="text-[14px] md:text-md">
              Influence
              <BsSortNumericDown onClick={() => sortByinfluenceAsc()} />
              <BsSortNumericDownAlt onClick={() => sortByinfluenceDsc()} />
            </button>
            <button className="text-[14px] md:text-md">
              Chirpiness
              <BsSortNumericDown onClick={() => sortBychirpinessAsc()} />
              <BsSortNumericDownAlt onClick={() => sortBychirpinessDsc()} />
            </button>
          </div>
        </section>

      </section>
      {/* Main Section */}
      <div>
        <section>
          {data.map((data, index) => (
            <section key={index}>
              <div>
                <p>
                  <FaTwitter />
                </p>

                <button onClick={() => userDelete(index)}>
                  <TiDelete />
                </button>
              </div>
              <div>
                <img src={data.image} alt="img" />
                <p>{data.fullname}</p>
                <p>@{data.username}</p>
                <p>{data.twubric.total}</p>
              </div>

              <div>
                <div>
                  <p>{data.twubric.friends}</p>
                  <label>Friends</label>
                </div>

                <div>
                  <p>{data.twubric.influence}</p>
                  <label>Influence</label>
                </div>

                <div>
                  <p>{data.twubric.chirpiness}</p>
                  <label>Chirpiness</label>
                </div>
              </div>
              <div>
                <label>Joining Date:</label>
                <p>{convertTimestampToDate(data.join_date)}</p>
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
