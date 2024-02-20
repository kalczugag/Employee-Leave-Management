const headerOptions = [
    {
        label: "Employee",
        render: (row) => (
            <div className="flex flex-row items-center space-x-4">
                <div className="w-12 h-12">
                    <img src={row.details.img} alt="img" />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-600">
                        {row.details.name}
                    </span>
                    <span>{row.details.email}</span>
                </div>
            </div>
        ),
    },
    { label: "Employee Mobile", render: (row) => row.mobile },
    { label: "Employee Address", render: (row) => row.address },
    {
        label: "Employee Roles",
        render: (row) => row.roles && <div>{row.roles.join(", ")}</div>,
    },
    { label: "Created On", render: (row) => row.createdOn },
];

const rows = [
    {
        details: {
            name: "jurek",
            email: "jaiodfg@gmail.com",
            img: "/images/avatar.jpg",
        },
        mobile: "123456789",
        address: "New York, USA",
        roles: ["ADMIN"],
        createdOn: "7 Nov 2022",
    },
    {
        details: {
            name: "jurek",
            email: "jaiodfg@gmail.com",
            img: "/images/avatar.jpg",
        },
        mobile: "123456789",
        address: "New York, USA",
        roles: ["ADMIN", "STAFF"],
        createdOn: "7 Nov 2022",
    },
    {
        details: {
            name: "jurek",
            email: "jaiodfg@gmail.com",
            img: "/images/avatar.jpg",
        },
        mobile: "123456789",
        address: "New York, USA",
        roles: ["STAFF"],
        createdOn: "7 Nov 2022",
    },
];

export const config = { headerOptions, rows };
