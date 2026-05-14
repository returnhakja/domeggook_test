import Spinner from '../Spinner/Spinner';

export default function LoadingCenter() {
  return (
    <div className="product-list__loading-center">
      <Spinner size={56} />
    </div>
  );
}
