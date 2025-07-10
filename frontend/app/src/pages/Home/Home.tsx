// src/pages/Home.tsx
import { useEffect} from 'react';
import axiosClient from '../../config/axios';
import HomeBanner from '../../components/home/homeBanner';
import IntroRiceComponent from '../../components/home/IntroRiceComponent';
import VariablesTableComponent from '../../components/home/VariablesTableComponent';


function Home() {

  useEffect(() => {
    axiosClient.get('/', {
      responseType: 'text'  
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
  }, []);

  return (
    <div className="p-4 m-5">
      <HomeBanner></HomeBanner>
      <IntroRiceComponent></IntroRiceComponent>
      <VariablesTableComponent></VariablesTableComponent>
    </div>
  );
}

export default Home;