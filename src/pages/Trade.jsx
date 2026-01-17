import { ChevronLeft, ChevronRight, Grid3X3, TrendingUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Trade = () => {
  const navigate = useNavigate();

  const tradeOptions = [
    {
      icon: <Grid3X3 size={22} />,
      title: 'Spot',
      description: 'Spot',
      path: '/chart',
    },
    {
      icon: <TrendingUp size={22} />,
      title: 'Perpetual',
      description: 'Perpetual',
      path: '/chart',
    },
    {
      icon: <FileText size={22} />,
      title: 'Delivery contract',
      description: 'Delivery contract',
      path: '/chart',
    },
  ];

  return (
    <div className="trade-page">
      <div className="page-title-with-back">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="page-title-text">Trade</div>
      </div>

      <div className="trade-menu">
        {tradeOptions.map((option, index) => (
          <div
            key={index}
            className="trade-option"
            onClick={() => navigate(option.path)}
          >
            <div className="trade-option-icon">
              {option.icon}
            </div>
            <div className="trade-option-info">
              <div className="trade-option-title">{option.title}</div>
              <div className="trade-option-desc">{option.description}</div>
            </div>
            <div className="trade-option-arrow">
              <ChevronRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
