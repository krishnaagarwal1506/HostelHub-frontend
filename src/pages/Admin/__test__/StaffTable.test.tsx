import { GymMembersType } from "@src/ts/types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import StaffTable from "../StaffTable";

describe("StaffTable", () => {
  const staffList: GymMembersType[] = [
    { id: 1, name: "John Doe", position: "Manager", status: "Present" },
    { id: 2, name: "Jane Smith", position: "Assistant", status: "Absent" },
  ];
  const getData = jest.fn();
  const setPaginationModel = jest.fn();
  const handleFilter = jest.fn();

  beforeEach(() => {
    render(
      <StaffTable
        GymList={staffList}
        getData={getData}
        paginationModel={{ page: 1, pageSize: 10 }}
        setPaginationModel={setPaginationModel}
        handleFilter={handleFilter}
      />
    );
  });

  it("renders staff members", () => {
    const staffName1 = screen.getByText("John Doe");
    const staffName2 = screen.getByText("Jane Smith");

    expect(staffName1).toBeInTheDocument();
    expect(staffName2).toBeInTheDocument();
  });

  it("calls getData when table is loaded", () => {
    expect(getData).toHaveBeenCalled();
  });

  it("calls handleFilter when filter is changed", () => {
    fireEvent.change(screen.getByTestId("filter"), {
      target: { value: "Present" },
    });
    expect(handleFilter).toHaveBeenCalled();
  });
});
