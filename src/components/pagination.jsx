import Link from 'next/link';

export function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <Link href="#">Previous</Link>;
    }
    if (type === "next") {
      return <Link href="#">Next</Link>;
    }
    return originalElement;
  }
  
  export function onShowSizeChange(current, pageSize) {
    // console.log(current, pageSize);
  }