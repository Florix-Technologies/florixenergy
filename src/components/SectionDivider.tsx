import { motion } from "framer-motion";

interface SectionDividerProps {
    type: "to-light" | "to-dark";
}

const SectionDivider = ({ type }: SectionDividerProps) => {
    if (type === "to-light") {
        return (
            <div className="relative h-24 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-full h-[calc(100%+2px)] -translate-y-px scale-[1.01]"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        style={{ fill: '#f5f2e9', transform: "rotate(180deg)", transformOrigin: "center" }}
                    ></path>
                </svg>
            </div>
        );
    }

    return (
        <div className="relative h-24 w-full overflow-hidden leading-[0]">
            <svg
                className="relative block w-full h-[calc(100%+2px)] scale-[1.01]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    style={{ fill: '#f5f2e9' }}
                ></path>
            </svg>
        </div>
    );
};

export default SectionDivider;
