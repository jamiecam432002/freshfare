import { createContext } from "react";

const TableContext = createContext();

export default function Table({ children }) {
  return (
    <TableContext.Provider>
      <div
        className="overflow-hidden rounded-lg border-[1px] border-solid border-[--color-grey-200] bg-[--color-grey-0] text-[1.4rem]"
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
      className="grid grid-cols-[30rem_5rem_10rem_25rem_6rem_5rem_auto_5rem] gap-[2.6rem] border-b border-[--color-grey-100] bg-[--color-grey-50] px-[2.4rem] py-[1.6rem] font-semibold uppercase tracking-[0.4px] text-[--color-grey-600]"
    >
      {children}
    </header>
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
function Body({ data, render }) {
  if (!data.length) return <p>No data to show at the moment</p>;
  return <section className="mx-[0] my-[0.4rem]">{data.map(render)}</section>;
}

Table.Header = Header;
//Table.Row = Row;
Table.Body = Body;
