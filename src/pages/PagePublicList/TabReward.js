export default function TabReward({ item, dataListWin, key, index }) {
  return (
    <>
      <tr
        className="min-h-full h-10"
        style={
          index % 2 === 0
            ? { backgroundColor: "#F0F0F0" }
            : { backgroundColor: "#ffffff" }
        }
      >
        <td className="font-regular-mon">{item.phone}</td>
        <td className="">
          <div className="w-52 mt-0 ml-1"> {item.gift}</div>
        </td>
        <td className="">
          <div className="border-table-listprize ">{item.validate_time}</div>
        </td>
      </tr>
    </>
  );
}
