import React from 'react';
import Header from '../components/Header';
import AddPrograms  from '../components/AddPrograms';
import ProgramList  from '../components/ProgramList';

const Home = () => {
    return  (<div>
    <Header/>
    <AddPrograms/>
    <ProgramList/>
    
</div>
    );
};

export default Home;