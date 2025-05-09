import PropTypes from 'prop-types';
import './ListComponent.css';

const ListComponent = ({ items, renderItem, emptyMessage }) => {
  if (!items || items.length === 0) {
    return <div className="empty-message">{emptyMessage || 'No items to display'}</div>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={item.id || index} className="list-item">
          {renderItem ? renderItem(item) : JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
};

ListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func,
  emptyMessage: PropTypes.string,
};

export default ListComponent;