export default function TabGift({ item, key, index }) {
  return (
    <>
      <tr
        className="h-12"
        style={
          index % 2 === 0
            ? { backgroundColor: "#E7E7E7" }
            : { backgroundColor: "#ffffff" }
        }
      >
        <td className="font-regular-mon w-48">{item.gift}</td>
        <td className=" flex justify-center mt-1">
          <div className="border-table-listgift mt-1 ml-0"> {item.plan}</div>
        </td>
        <td className="">
          <div
            className="border-table-listwhitegift"
            style={
              index % 2 === 0
                ? { backgroundColor: "#E7E7E7" }
                : { backgroundColor: "#ffffff" }
            }
          >
            {item.used}
          </div>
        </td>
        <td className="">
          <div
            className="border-table-listwhitegift "
            style={
              index % 2 === 0
                ? { backgroundColor: "#E7E7E7" }
                : { backgroundColor: "#ffffff" }
            }
          >
            {item.remaining}
          </div>
        </td>
      </tr>
    </>
  );
}
