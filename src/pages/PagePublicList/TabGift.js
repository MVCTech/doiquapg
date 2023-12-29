export default function TabGift({ item, key, index }) {
  return (
    <>
      <tr
        className="h-12"
        style={
          index % 2 === 0
            ? { backgroundColor: "#E7E7E7", border: "1px solid #ffffff" }
            : { backgroundColor: "#ffffff" }
        }
      >
        <td id="gift" className="font-regular-mon pl-1 w-[150px]">
          {item.gift}
        </td>
        <td id="gift" className="border-0">
          <div className="border-table-listgift ml-0"> {item.plan}</div>
        </td>
        <td id="gift" className="">
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
        <td id="gift" className="">
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
