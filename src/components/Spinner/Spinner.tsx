import "./Spinner.css";

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <div className="spinner-wrap">
      <svg
        className="spinner"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="status"
      >
        <circle cx="16" cy="16" r="13" stroke="#e5e5e5" strokeWidth="3" />
        <path
          d="M16 3a13 13 0 0 1 13 13"
          stroke="#00b336"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
