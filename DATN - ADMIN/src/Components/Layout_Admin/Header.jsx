export default function Header() {
  return (
    <>
      {/* header */}
      <div className="shadow bg-primary text-white d-flex justify-content-between align-content-center p-3 pb-1 d-none d-md-flex">
        <p>TRANG QUẢN TRỊ WEBSITE UTECH</p>
        <div>
          <span>Admin</span>
          <img
            className="rounded m-1 border border-1 border-white"
            width="30px"
            height="30px"
            src="/img/logo/logo.png"
            alt=""
          />
        </div>
      </div>
      {/* header end */}
    </>
  );
}
