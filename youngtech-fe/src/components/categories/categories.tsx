import AppItemCategories from './itemCategories';

const Categories: React.FC = () => {
  return (

      <div className="w-full bg-white mt-5 rounded-lg overflow-hidden"> 
        <div className="flex no-scrollbar sm:flex-nowrap md:flex-nowrap overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:grid lg:grid-cols-8 gap-4 lg:overflow-visible">
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
        </div>
      </div>
   
  );
};

export default Categories;
