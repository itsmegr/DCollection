export default function getLastEntryString(lastEntryTime : Date): string {
  let timeDiff = Math.floor(
    (new Date().getTime() - lastEntryTime.getTime()) / 1000
  );
  if (timeDiff < 60) {
    return "Just now";
  } else if (timeDiff < 3600) {
    return `last entry ${Math.floor(timeDiff / 60)} minutes ago`;
  } else if (timeDiff < 86400) {
    return `last entry ${Math.floor(timeDiff / 3600)} hours ago`;
  } else if (timeDiff < 604800) {
    return `last entry ${Math.floor(timeDiff / 86400)} days ago`;
  } else {
    //return date in mon dd, yyyy format
    let formattedDate = lastEntryTime.toISOString().split("T")[0];

    // get month name from date
    formattedDate = new Date(formattedDate).toLocaleString("default", {
      month: "long",
    });

    const sp = formattedDate.split(/\s+/);

    if (lastEntryTime.getFullYear() == new Date().getFullYear()) {
      return `last entry ${sp[1]} ${sp[2]}`;
    }

    return `last entry ${sp[1]} ${sp[2]}, ${sp[4]}`;
  }
}
