import React from "react";

const DEFAULT_ICON_SIZE = 128;

// #region Damage Icons

export function Arborae({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.933"
        r="15.633"
        stroke="#62cd61"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        fill="#62cd61"
        d="M18.91 10.598s.4-4.01.05-4.61c-.351-.602-.652-1.955-3.208-2.106s-2.606.752-2.556 1.353c.05.602 1.604 1.804 1.704 2.356s-.3.651-1.002.751-1.253.802-1.203 1.303.401 1.704 1.153 2.306c.752.6 1.954.801 2.756 2.405 0 0 .1.3 0 .551 0 0-.802-.25-1.654-.952-.852-.701-1.303.35-1.904.2s-2.205-.6-2.606-2.906c0 0-.1-.3-.3-.2s-.251.701-.251.952c0 .25.25 1.152 1.102 1.804.852.651 1.003.751 1.303.902.301.15 1.504 0 2.005 0s.752.05 1.203.45c.45.402.801.652.751.953s-.125 1.027-.526 1.228c0 0-.194.577.176.927l1.12-.405 1.285-.898s-1.754-.652-.601-2.355c1.152-1.704 1.202-1.754 2.505-2.506s1.203-1.804.2-2.005c-1.002-.2-1.453 1.053-1.503.502"
      ></path>
      <ellipse
        cx="13.225"
        cy="15.57"
        fill="none"
        stroke="#62cd61"
        strokeWidth="0.491"
        paintOrder="fill markers stroke"
        rx="0.981"
        ry="0.861"
      ></ellipse>
      <g transform="rotate(-119.92 16.95 16.877)">
        <path
          fill="#62cd61"
          d="M18.91 10.598s.4-4.01.05-4.61c-.351-.602-.652-1.955-3.208-2.106s-2.606.752-2.556 1.353c.05.602 1.604 1.804 1.704 2.356s-.3.651-1.002.751-1.253.802-1.203 1.303.401 1.704 1.153 2.306c.752.6 1.954.801 2.756 2.405 0 0 .1.3 0 .551 0 0-.802-.25-1.654-.952-.852-.701-1.303.35-1.904.2s-2.205-.6-2.606-2.906c0 0-.1-.3-.3-.2s-.251.701-.251.952c0 .25.25 1.152 1.102 1.804.852.651 1.003.751 1.303.902.301.15 1.504 0 2.005 0s.752.05 1.203.45c.45.402.801.652.751.953s-.125 1.027-.526 1.228c0 0-.194.577.176.927l1.12-.405 1.285-.898s-1.754-.652-.601-2.355c1.152-1.704 1.202-1.754 2.505-2.506s1.203-1.804.2-2.005c-1.002-.2-1.453 1.053-1.503.502"
        ></path>
        <ellipse
          cx="13.225"
          cy="15.57"
          fill="none"
          stroke="#62cd61"
          strokeWidth="0.491"
          paintOrder="fill markers stroke"
          rx="0.981"
          ry="0.861"
        ></ellipse>
      </g>
      <g transform="rotate(121.709 16.95 16.877)">
        <path
          fill="#62cd61"
          d="M18.91 10.598s.4-4.01.05-4.61c-.351-.602-.652-1.955-3.208-2.106s-2.606.752-2.556 1.353c.05.602 1.604 1.804 1.704 2.356s-.3.651-1.002.751-1.253.802-1.203 1.303.401 1.704 1.153 2.306c.752.6 1.954.801 2.756 2.405 0 0 .1.3 0 .551 0 0-.802-.25-1.654-.952-.852-.701-1.303.35-1.904.2s-2.205-.6-2.606-2.906c0 0-.1-.3-.3-.2s-.251.701-.251.952c0 .25.25 1.152 1.102 1.804.852.651 1.003.751 1.303.902.301.15 1.504 0 2.005 0s.752.05 1.203.45c.45.402.801.652.751.953s-.125 1.027-.526 1.228c0 0-.194.577.176.927l1.12-.405 1.285-.898s-1.754-.652-.601-2.355c1.152-1.704 1.202-1.754 2.505-2.506s1.203-1.804.2-2.005c-1.002-.2-1.453 1.053-1.503.502"
        ></path>
        <ellipse
          cx="13.225"
          cy="15.57"
          fill="none"
          stroke="#62cd61"
          strokeWidth="0.491"
          paintOrder="fill markers stroke"
          rx="0.981"
          ry="0.861"
        ></ellipse>
      </g>
    </svg>
  );
}

export function Cryonae({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <path
        stroke="#5aaff2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        d="M32.566 16.933a15.633 15.633 0 0 1-15.633 15.633A15.633 15.633 0 0 1 1.3 16.933 15.633 15.633 0 0 1 16.933 1.3a15.633 15.633 0 0 1 15.633 15.633"
        paintOrder="fill markers stroke"
      ></path>
      <g fill="#5aaff2">
        <path
          d="m13.595 19.232 3.34-13.81 3.338 13.81z"
          paintOrder="fill markers stroke"
        ></path>
        <path d="m16.337 8.342-4.51-3.558 4.811 2.406Zm1.194 0 4.51-3.558L17.23 7.19Zm-1.004 2.197-3.073-2.424 3.278 1.639Zm.813 0 3.073-2.424-3.277 1.639Z"></path>
        <path
          d="m13.594 14.626 3.34 13.81 3.338-13.81z"
          paintOrder="fill markers stroke"
        ></path>
        <path d="m16.337 25.515-4.51 3.558 4.811-2.406Zm1.194 0 4.51 3.558-4.811-2.406Zm-1.004-2.197-3.073 2.424 3.278-1.639Zm.813 0 3.073 2.424-3.277-1.639Z"></path>
        <path
          d="m13.27 15.189 13.628-4.014-10.29 9.797z"
          paintOrder="fill markers stroke"
        ></path>
        <path d="m24.072 12.118.826-5.684.322 5.37Zm.597 1.035 5.336 2.126-4.489-2.963Zm-2.405.229.563-3.874.22 3.659Zm.407.704 3.636 1.449-3.058-2.019Z"></path>
        <path
          d="m17.259 12.884-10.29 9.797 13.63-4.013z"
          paintOrder="fill markers stroke"
        ></path>
        <path d="m9.2 20.705-5.337-2.127 4.49 2.963Zm.596 1.034-.826 5.685-.322-5.37Zm1.401-1.968-3.636-1.45 3.059 2.02Zm.407.704-.563 3.873-.22-3.657Z"></path>
        <path
          d="m17.259 20.973-10.29-9.797 13.629 4.013z"
          paintOrder="fill markers stroke"
        ></path>
        <path d="m9.199 13.153-5.336 2.126 4.489-2.963Zm.597-1.035L8.97 6.434l-.322 5.37Zm1.4 1.968-3.635 1.45 3.058-2.02Zm.407-.704L11.04 9.51l-.219 3.658Z"></path>
        <path
          d="m13.27 18.67 13.628 4.013-10.29-9.797z"
          paintOrder="fill markers stroke"
        ></path>
        <path d="m24.072 21.739.826 5.685.322-5.37Zm.597-1.034 5.336-2.127-4.49 2.963Zm-2.405-.23.563 3.874.22-3.658Zm.406-.703 3.636-1.45-3.058 2.019Z"></path>
      </g>
      <path
        fill="#5aaff2"
        stroke="#5aaff2"
        strokeLinecap="round"
        strokeWidth="1.439"
        d="m20.93 19.241-3.997 2.308-3.997-2.308v-4.616l3.997-2.308 3.998 2.308z"
        paintOrder="fill markers stroke"
      ></path>
    </svg>
  );
}

export function Infernae({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.933"
        r="15.633"
        stroke="#e47d31"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        fill="#e47d31"
        d="M17.718 4.125s-.213.567-1.489 1.063c-1.275.496-2.338 2.197-2.551 3.047s-.78 1.843-.354 3.898c.425 2.055.567 4.323.212 4.89-.354.567-.992 1.701-1.417.78-.425-.922 0-3.048-.284-3.898-.283-.85-1.488-3.756-2.41-3.898m0 0s1.49 4.701-.495 6.65.708 10.335 3.791 11.15c-.23-.057-.736-1.195-1.15-2.385-.387-1.23-.694-1.954-.283-2.955 0 0-.04.735.814 2.042 0 0 .343.493.82.674-1.157-3.04 3.046-3.87 3.614-4.9.349-.663 1.09-1.521 1.09-1.521.288-.557.585-1.16.576-1.385 0 0 .035.497.248 1.24.208.73.354 1.737.638 1.914.283.177 1.346 1.488 1.524 1.95.177.46.07-.249.46-1.17.39-.922.104-1.645.53-.511.424 1.134 1.277 2.389.25 4.196-1.028 1.807-2.8 3.685-3.402 4.359 0 0 3.154-.674 5.457-4.11 2.303-3.438 2.374-4.82 1.134-7.584S21.923 9.759 21.923 8.2s-1.418.531-1.489 1.488c-.07.957.461 3.898-.531 3.473 0 0-4.784-2.786-2.374-7.973 0 0 .236-.567.189-1.063"
      ></path>
    </svg>
  );
}

export function Necromae({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.908"
        r="15.633"
        fill="#fff"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        stroke="#000"
        strokeWidth="0.265"
        d="M14.552 29.19c-.567-.284-1.56-.993-2.693-1.914-1.134-.922-1.488-2.339-1.63-2.623-.142-.283 0-2.055-.07-2.976-.072-.921-.639-.992-1.56-1.843-.921-.85-.425-1.984-.284-2.835.142-.85 1.134-1.204 1.276-2.374.142-1.169-2.551-3.437-.496-6.555 2.055-3.119 7.82-3.26 7.82-3.26s5.764.141 7.819 3.26-.638 5.386-.496 6.555c.141 1.17 1.134 1.524 1.275 2.374s.638 1.985-.283 2.835-1.488.922-1.56 1.843c-.07.921.072 2.693-.07 2.976-.142.284-.496 1.701-1.63 2.623-1.134.921-2.126 1.63-2.693 1.913s-2.363-.165-2.363-.165-1.795.449-2.362.165z"
      ></path>
      <path
        fill="#fff"
        stroke="#fff"
        strokeWidth="0.268"
        d="M23.353 17.613c-.312.74-1.133 1.453-2.531 1.453s-2.831-.901-2.831-1.704 1.246-1.065 2.18-1.554c2.263-1.184 3.887.134 3.182 1.804zm-12.519 0c.312.74 1.133 1.453 2.531 1.453s2.831-.901 2.831-1.704-1.246-1.065-2.18-1.554c-2.263-1.184-3.887.134-3.182 1.804z"
        paintOrder="fill markers stroke"
      ></path>
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="bevel"
        strokeWidth="0.265"
        d="m22.82 21.486-1.002.605v2.292l1.002-.796zm-11.516 0 1.002.605v2.292l-1.002-.796z"
      ></path>
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="bevel"
        strokeWidth="0.238"
        d="M13.87 24.094v1.639h.83v-1.639Zm1.175.307v1.488h.78v-1.488zm2.978 0v1.488h.78v-1.488z"
      ></path>
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth="0.238"
        d="M19.153 24.094v1.639h.83v-1.64Z"
      ></path>
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="bevel"
        strokeWidth="0.193"
        d="M16.142 24.788v1.207h.633v-1.207Zm.927 0v1.207h.633v-1.207Z"
      ></path>
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth="0.225"
        d="M18.298 21.928c-.181.047-.431.081-.63-.048-.271-.177-.293-.788-.742-1.101-.448.313-.47.924-.742 1.101-.198.13-.448.095-.63.048-.582-.15.777-3.156 1.372-3.156s1.954 3.005 1.372 3.156z"
        paintOrder="fill markers stroke"
      ></path>
    </svg>
  );
}

export function Tempestae({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.933"
        r="15.633"
        stroke="#ffe646"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <circle
        cx="16.933"
        cy="16.933"
        r="3.191"
        stroke="#ffe646"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.323"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        fill="#ffe646"
        d="M13.347 16.503c-.856-1.443-.51-2.597.213-4.11 1.444-2.356 3.985-2.778 3.154-2.941-1.533-.229-2.603-.255-2.693-.496.392-2.292 5.083-3.331 8.598-3.964 0 0-4.145-1.897-9.717 1.396-2.285 1.351-4.145 3.876-4.25 8.225.983-1.2 2.108-2.413 3.248-2.617-.366 1.765-.722 4.007.766 6.082.854 1.153 2.327 2.806 3.87 2.571-1.412-1.149-2.878-2.262-3.189-4.146"
      ></path>
      <path
        fill="#ffe646"
        d="M20.73 17.236c.856 1.443.51 2.598-.212 4.11-1.445 2.357-3.986 2.779-3.154 2.942 1.532.228 2.603.255 2.693.496-.392 2.291-5.084 3.33-8.599 3.963 0 0 4.146 1.898 9.718-1.396 2.285-1.35 4.144-3.875 4.25-8.224-.984 1.2-2.109 2.413-3.249 2.616.366-1.764.723-4.006-.765-6.082-.855-1.153-2.47-2.663-4.013-2.43 1.413 1.15 3.02 2.122 3.331 4.005"
      ></path>
    </svg>
  );
}

export function Impact({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.933"
        r="15.633"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.3091680799999998"
        d="m24.856 26.315-3.04-.986-.648 3.13-2.52-1.966-1.679 2.72-1.695-2.71-2.508 1.982-.667-3.126-3.034 1.005.443-3.166-3.195-.094 1.499-2.823-2.97-1.18 2.374-2.141-2.388-2.126 2.963-1.199-1.516-2.814 3.194-.113-.462-3.163 3.04.986.648-3.13 2.52 1.966 1.679-2.72 1.695 2.71 2.508-1.982.667 3.126 3.034-1.004-.443 3.165 3.195.094-1.499 2.823 2.97 1.181-2.374 2.14 2.387 2.126-2.962 1.2 1.516 2.813-3.195.114z"
        paintOrder="fill markers stroke"
      ></path>
      <path
        fill="#fff"
        stroke="#000"
        strokeWidth="0.325"
        d="M9.307 13.438c-.064.908-.062.842 0 1.519s-.076 1.907.047 2.214c.123.308.416 1.661.539 1.784s.43.677.738.739c.307.061 1.2.061 1.322-.062s.031-1.169.031-1.169-.092-2.522-.123-2.676c-.054-.755.14-.972.185-.707l-.031 2.184s.181 1.855.277 2.122c.154.43-.093 1.046 1.138 1.046s1.046.061 1.569-.031c.46-.154.184-1.323.092-2.614-.092-1.292-.216-2.492-.123-2.676.092-.185.184-.431.277-.216.092.216-.062.462-.062.8s.308 3.322.43 3.876c.124.553.4.984.585.984s1.753.03 2.061-.123c.308-.154.492-.77.492-.861 0-.093 0-4.03-.061-4.214-.308-.751.23-.871.123-.062 0 0-.062 4.49 0 4.552.061.062-.093.585.123.739.215.153.8.43.892.43s1.568 0 1.691-.061c.123-.062.4-.523.37-.646s-.031-.492.03-.43c.062.06.308.122.308.122s.184 0 .184-.092-.184-3.968-.123-4.03c.062-.061.062.339.093.462.03.123.092 2.245.092 2.338s.061 1.26 0 1.353c-.062.092-.492.03-.492.03s-.062.4 0 .524c.061.123.03.369-.062.461s-1.538.061-1.722.061c-.185 0-.83.031-.954-.092-.123-.123-.646-.369-.769-.369-.16-.037-.656.021-1.169.03-1.07.02-1.913 1.108-1.913 1.108-.062.092-.462.952.246 1.106.332.072 1.942-.21 2.735-.109 1.015.13 1.524.28 2.993.263.126-.001 1.322-.492 1.63-.892s1.322-1.321 1.415-1.567.307-2.553.123-2.769c-.185-.215-1.077-2.645-1.2-2.799s-.369-.4-.43-.615c-.2-.215-.293-1.304-.354-1.55-.154-.246-.226-.664-.446-.923-.308-.215-.528-1.095-1.482-1.095-.953 0-1.779.265-1.994.388s-.83.338-.953.277c-.123-.062-.308-.43-.616-.554-.307-.123-1.66-.215-1.845-.03-.185.184-.77.83-1.077.891s-.553-.338-.8-.338c-.246 0-1.014.092-1.168.215s-.37.523-.646.615c-.277.093-.57.216-.908.216s-.338-.062-.677.123c-.303.223-.567.403-.63.8Z"
      ></path>
    </svg>
  );
}

// #endregion

// #region Skill Icons
export function Passive({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <g paintOrder="fill markers stroke">
        <circle
          cx="16.933"
          cy="16.933"
          r="16.177"
          fill="#5098e4"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.369"
        ></circle>
        <path
          fill="#284d72"
          d="M28.722 13.519c0 8.524-6.876 15.434-15.36 15.434-8.482 0-12.697-4.39-12.697-12.914S7.542.605 16.025.605s12.697 4.39 12.697 12.914"
        ></path>
        <circle
          cx="16.933"
          cy="16.933"
          r="16.177"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.369"
        ></circle>
      </g>
    </svg>
  );
}

export function Guard({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.933"
        r="15.633"
        fill="#ccc"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        fill="#5d5c55"
        stroke="#000"
        strokeWidth="0.265"
        d="M25.65 6.548v10.49s.354 7.795-8.717 10.275c-9.072-2.48-8.717-10.276-8.717-10.276V6.548Z"
      ></path>
      <path
        fill="#fff"
        d="M16.953 15.36h-7.86c.12-.03-1.669 8.136 7.84 10.956z"
      ></path>
      <path
        fill="#5eb55f"
        d="M9.053 7.546h7.86v7.814h-7.86z"
        paintOrder="fill markers stroke"
      ></path>
      <path
        fill="#fff"
        d="M16.913 7.546h7.86v7.814h-7.86z"
        paintOrder="fill markers stroke"
      ></path>
      <path
        fill="#6c8ee4"
        d="M16.913 15.36h7.86c-.07-.039 1.78 8.084-7.84 10.956z"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeWidth="0.239"
        d="M24.812 7.546v9.481s.32 7.047-7.88 9.29c-8.199-2.243-7.879-9.29-7.879-9.29v-9.48Z"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeWidth="0.265"
        d="M12.102 7.542v16.257m9.622-16.257v16.257M15.31 7.542v18.191M18.6 7.542v18.191"
      ></path>
      <path
        fill="#ceced6"
        stroke="#000"
        strokeWidth="0.265"
        d="m13.274 23.164 12.083-12.083s1.382-2.304 1.312-3.792C25.18 7.219 22.877 8.6 22.877 8.6L10.794 20.683Z"
      ></path>
      <path
        fill="#6b656b"
        d="M12.757 22.52 25.498 9.795s.744-1.24.706-2.042c-.8-.038-2.041.706-2.041.706L11.396 21.078Z"
      ></path>
      <path
        fill="#f2f2f2"
        d="M13.395 20.775 25.173 8.962s.136-.226.129-.372c-.146-.007-.372.128-.372.128L13.147 20.512Z"
      ></path>
      <path
        fill="#944132"
        stroke="#000"
        strokeWidth="0.265"
        d="m10.794 20.684.405.405h.381l.467-.466h1.237v1.187l-.4.401v.577l.39.376m-2.48-2.48-1.006-1.057-.765.442v1.399l.84.89-2.667 2.668v.902l.651.651h.802l2.68-2.68.878.876h1.804l.25-.624-.987-.987"
      ></path>
      <path
        fill="#a15b45"
        d="m9.863 22.358 1.467 1.54-2.681 2.681h-.802l-.651-.651v-.902z"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeWidth="0.265"
        d="m9.863 22.358 1.467 1.54-2.681 2.681h-.802l-.651-.651v-.902z"
      ></path>
    </svg>
  );
}

// #endregion

// #region Regions

export function Hopeport({ ...props }: React.SVGProps<SVGSVGElement>) {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 33.867 33.867"
      className="game-icon"
    >
      <circle
        cx="16.933"
        cy="16.933"
        r="15.633"
        fill="#232323"
        stroke="#f5d04c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.484"
        paintOrder="fill markers stroke"
      ></circle>
      <circle
        cx="16.983"
        cy="6.961"
        r="2.416"
        fill="#232323"
        stroke="#f5d04c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.455"
        paintOrder="fill markers stroke"
      ></circle>
      <path
        fill="#f5d04c"
        d="M15.869 9.445h2.205v16.237h-2.205z"
        paintOrder="fill markers stroke"
      ></path>
      <path
        fill="#f5d04c"
        d="M22.507 12.251v1.854h-11.07v-1.854z"
        paintOrder="fill markers stroke"
      ></path>
      <path
        fill="#f5d04c"
        stroke="#f4d04c"
        strokeWidth="0.265"
        d="M17.145 30.5c.441-.712 1.736-3.2 3.097-4.361 1.3-.952 2.106-.922 3.546-2.113 1.61-1.332 2.56-3.544 2.56-3.544.15.248.857 1.23.857 1.23.397.348.372-.272.372-.272l-.372-4.374c-.596.843-3.647 2.53-3.746 2.778s.645.223.645.223l.843-.025c-1.438 2.63-4.712 3.175-5.407 3.473s-1.637-1.985-1.637-1.985H16.04s-.942 2.283-1.637 1.985c-.694-.298-3.968-.844-5.407-3.473l.843.025s.744.025.645-.223c-.1-.248-3.15-1.935-3.745-2.778l-.372 4.374s-.025.62.372.272c0 0 .707-.982.856-1.23 0 0 .95 2.212 2.56 3.544 1.44 1.19 2.247 1.16 3.546 2.113 1.361 1.162 2.691 3.649 3.097 4.36.174.189.174.18.347 0z"
      ></path>
    </svg>
  );
}

// #endregion
