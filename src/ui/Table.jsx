import { createContext, useContext } from "react";

const TableContext = createContext();

export default function Table({ children, columns, variation }) {
  return (
    <TableContext.Provider value={{ columns, variation }}>
      <div
        className="border-grey-200 bg-grey-0 overflow-hidden rounded-lg border border-solid text-[1.4rem]"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}
function Header({ children }) {
  const { columns, variation } = useContext(TableContext);
  const padding =
    variation === "condensed"
      ? {
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }
      : {
          paddingLeft: "2.4rem",
          paddingRight: "2.4rem",
          paddingTop: "1.6rem",
          paddingBottom: "1.6rem",
        };
  return (
    <header
      role="row"
      style={{ gridTemplateColumns: columns, ...padding }}
      className="border-grey-100 bg-grey-50 text-grey-600 grid gap-[2.6rem] border-b font-semibold"
    >
      {children}
    </header>
  );
}

function Row({ children }) {
  const { columns, variation } = useContext(TableContext);
  const padding =
    variation === "condensed"
      ? {
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: ".75rem",
          paddingBottom: "0.75rem",
        }
      : {
          paddingLeft: "2.4rem",
          paddingRight: "2.4rem",
          paddingTop: "1.2rem",
          paddingBottom: "1.2rem",
        };
  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns, ...padding }}
      className="border-grey-100 grid items-center gap-[2.6rem] border-b"
    >
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <div className="bg-grey-50 flex justify-center px-[1.2rem] py-[1.2rem]">
      {children}
    </div>
  );
}

function Body({ data = [], render }) {
  if (!data.length)
    return (
      <p className="m-[2.4rem] text-center text-[1.6rem] font-medium">
        No data to show at the moment
      </p>
    );
  return <section className="mx-0 my-[0.4rem]">{data.map(render)}</section>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
