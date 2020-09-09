import React from "react";
import { useFetch } from "../utils";

export const Schedule = (props) => {
  const url =
    "https://www.googleapis.com/calendar/v3/calendars/mkr5k66b069hve1f7aa77m4bsc@group.calendar.google.com/events?key=AIzaSyAkeDHwQgc22TWxi4-2r9_5yMWVnLQNMXc";
  const { response } = useFetch(url);
  return (
    <div
      {...props}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "50vw",
        border: "1px solid white",
        background: "rgba(20, 20, 20, 1)",
        margin: "10px",
        overflow: "auto",
        color: "white",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      {response
        ? response.items.map((item, i) => (
            <div
              style={{
                borderTop: i !== 0 ? "1px solid #aaa" : "",
                padding: "10px 0",
              }}
            >
              {item.summary}
            </div>
          ))
        : null}
    </div>
  );
};
