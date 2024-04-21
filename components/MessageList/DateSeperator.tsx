import { DateSeparatorProps } from "stream-chat-react";

const DateSeperator = (props: DateSeparatorProps) => {
  const { date } = props;

  const formateDate = (date: Date): string => {
    return `${date.toLocaleDateString("en-US", { dateStyle: "long" })}`;
  };
  return (
    <div className="border-b relative flex items-center justify-center my-6">
      <span className="absolute left-auto right-auto text-xs font-semibold text-gray-200 bg-discord-gray-300 px-2">
        {formateDate(date)}
      </span>
    </div>
  );
};

export default DateSeperator;
