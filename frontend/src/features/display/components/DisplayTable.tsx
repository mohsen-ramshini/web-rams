import React, { useState, useMemo } from "react";
import {
  DesktopOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Table,
  Input,
  Checkbox,
  Select,
  Button,
  Space,
  Spin,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useGetDispllay } from "../api/useGetDisplay";
import { useCategories } from "../../createDisplay/api/useFetchCategories";
import { useGetBrands } from "../../createDisplay/api/useGetBrands";
import { useBulkDeleteDisplays } from "../api/useBulkDeleteDisplay";

interface DisplayData {
  id: string;
  title: string;
  description: string;
  keywords: string;
  categoryId: string | null;
  displayType: string;
  brandId: string | null;
  serialNumber: string;
  sound: any;
  createDate: string;
  displaySize: string;
  horizontalNumber: number;
  verticalNumber: number;
  aspectRatio: string;
}

const displayTypes = [
  "lcd screen",
  "floor stand screen",
  "tablet",
  "led video wall",
  "lcd video wall",
  "smartphone",
  "other",
];

const DisplayTable: React.FC = () => {
  const queryClient = useQueryClient();

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState({
    id: "",
    brandId: "",
    categoryId: "",
    displays: [] as string[],
  });
  const [pageSize, setPageSize] = useState(5);

  const { data: displays, isLoading, isError } = useGetDispllay();
  const { data: categoriesData } = useCategories();
  const { data: brands } = useGetBrands();
  const bulkDeleteMutation = useBulkDeleteDisplays();

  const filteredData = useMemo(() => {
    if (isLoading || isError || !displays) return [];

    return displays.filter((item: DisplayData) => {
      const matchesId = !filters.id || item.id?.toString().includes(filters.id);
      const matchesBrand = !filters.brandId || item.brandId?.toString().includes(filters.brandId);
      const matchesCategory = !filters.categoryId || item.categoryId?.toString().includes(filters.categoryId);
      const matchesDisplays = filters.displays.length === 0 || filters.displays.includes(item.displayType);
      return matchesId && matchesBrand && matchesCategory && matchesDisplays;
    });
  }, [filters, displays, isLoading, isError]);

  const selectedRowKeys = Object.keys(rowSelection);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Displays",
      key: "displayType",
      render: (_: any, record: DisplayData) => (
        <div className="flex flex-col items-center">
          <DesktopOutlined style={{ fontSize: 40, color: "blue" }} />
          <span>{record.displayType}</span>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category / Data",
      key: "categoryData",
      render: (_: any, record: DisplayData) => {
        const category = categoriesData?.find((cat: any) => cat.id === record.categoryId);
        const categoryTitle = category?.name || "-";
        const categoryColor = category?.categoryColor || "#ccc";

        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: categoryColor,
                  display: "inline-block",
                  border: "1px solid #999",
                }}
              ></span>
              <strong>{categoryTitle}</strong>
            </div>
            <span className="flex justify-between">
              <strong>Size:</strong> {record.displaySize || "-"}
            </span>
            <span className="flex justify-between">
              <strong>Created:</strong> {new Date(record.createDate).toLocaleDateString()}
            </span>
          </div>
        );
      },
    },
    {
      key: "action",
      render: (_: any, record: DisplayData) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => console.log("Editing:", record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 w-full h-full">
      <div className="border-b-4 mb-10">
        <h2 className="text-blue-500 font-bold text-3xl mb-2">Display Overview</h2>
        <p className="text-black mb-5">Customize the results list using the filters below</p>
      </div>

      
      <div className="h-auto flex flex-wrap flex-col lg:flex-row justify-between gap-6 mb-6 pb-10 border-b-2">
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
          <label className="mb-1 font-semibold text-gray-700">ID</label>
          <Input
            placeholder="Enter ID"
            value={filters.id}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, id: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
          <label className="mb-1 font-semibold text-gray-700">Brand</label>
          <Select
            placeholder="Select brand"
            value={filters.brandId || undefined}
            options={brands?.map((brand: any) => ({
              label: brand.name,
              value: brand.id,
            }))}
            onChange={(value) => setFilters((prev) => ({ ...prev, brandId: value }))}
            allowClear
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
          <label className="mb-1 font-semibold text-gray-700">Category</label>
          <Select
            placeholder="Select category"
            value={filters.categoryId || undefined}
            options={categoriesData?.map((cat: any) => ({
              label: cat.name,
              value: cat.id,
            }))}
            onChange={(value) => setFilters((prev) => ({ ...prev, categoryId: value }))}
            allowClear
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-1 font-semibold text-gray-700">Filter by Display Type</label>
          <Checkbox.Group
            options={displayTypes}
            value={filters.displays}
            onChange={(checkedValues) =>
              setFilters((prev) => ({ ...prev, displays: checkedValues as string[] }))
            }
            className="flex flex-wrap gap-2"
          />
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex flex-col w-full sm:w-1/3">
          <Select
            defaultValue={5}
            onChange={(value) => setPageSize(value)}
            options={[
              { value: 5, label: "5 / page" },
              { value: 10, label: "10 / page" },
              { value: 20, label: "20 / page" },
            ]}
          />
        </div>

        <div className="text-gray-600">
          {selectedRowKeys.length > 0
            ? `${selectedRowKeys.length} item${selectedRowKeys.length > 1 ? "s" : ""} selected`
            : "No items selected"}
        </div>

        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          disabled={selectedRowKeys.length === 0}
          onClick={() =>
            bulkDeleteMutation.mutate(
              { ids: selectedRowKeys },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["displays"] });
                  setRowSelection({});
                },
              }
            )
          }
        >
          Delete
        </Button>
      </div>

      
      <div className="h-auto sm:h-4/5">
        {isLoading ? (
          <Spin size="large" />
        ) : isError ? (
          <p>Error loading data...</p>
        ) : (
          <Table
            rowSelection={{
              type: "checkbox",
              selectedRowKeys,
              onChange: (newSelectedRowKeys) => {
                const selection: Record<string, boolean> = {};
                newSelectedRowKeys.forEach((key) => (selection[String(key)] = true));
                setRowSelection(selection);
              },
            }}
            columns={columns}
            dataSource={filteredData.map((item: any) => ({
              ...item,
              key: item.id,
            }))}
            pagination={{
              pageSize: pageSize,
              showSizeChanger: false,
            }}
            scroll={{ x: "max-content" }}
            className="border rounded-xl shadow-sm"
          />
        )}
      </div>
    </div>
  );
};

export default DisplayTable;
