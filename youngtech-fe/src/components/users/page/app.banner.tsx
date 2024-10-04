import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '240px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
    <div style={{ height: '240px', overflow: 'hidden',width:'100%' }}>
  <Carousel autoplay>
    <div>
      <img src="/images/banner1.jpg" alt="Image 1" style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
    </div>
    <div>
      <img src="/images/banner1.jpg" alt="Image 2" style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
    </div>
    <div>
      <img src="/images/banner1.jpg" alt="Image 3" style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
    </div>
    <div>
      <img src="/images/banner1.jpg" alt="Image 4" style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
    </div>
  </Carousel>
  </div>
);

export default App;
