import { createContext } from "react";

const TableContext = createContext();

export default function Table({ children }) {
  return (
    <TableContext.Provider>
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
  return (
    <header
      role="row"
      className="border-grey-100 bg-grey-50 text-grey-600 grid grid-cols-[26rem_7rem_12rem_7rem_7rem_auto_10rem_5rem] gap-[2.6rem] border-b px-[2.4rem] py-[1.2rem] font-semibold"
    >
      {children}
    </header>
  );
}
function Footer({ children }) {
  return (
    <div className="bg-grey-50 flex justify-center px-[1.2rem] py-[1.2rem]">
      {children}
    </div>
  );
}
/*function Row({ children }) {
  //const { columns } = useContext(TableContext);
  return (
    <div className="border-b border-[--color-grey-100]" role="row">
      {children}
    </div>
  );
}*/
function Body({ data = [], render }) {
  if (!data.length) return <p>No data to show at the moment</p>;
  return <section className="mx-0 my-[0.4rem]">{data.map(render)}</section>;
}

Table.Header = Header;
//Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
