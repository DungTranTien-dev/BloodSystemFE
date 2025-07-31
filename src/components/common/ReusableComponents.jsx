// Reusable UI Components Library
import React from 'react';
import { 
  Card, 
  Button, 
  Input, 
  Select, 
  DatePicker, 
  Form, 
  Table, 
  Pagination,
  Modal,
  Badge,
  Tag,
  Tooltip,
  Progress,
  Spin,
  Empty,
  Alert
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ExportOutlined,
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * Reusable Data Table Component with common features
 */
export const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  pagination = true,
  rowSelection = null,
  searchable = true,
  filterable = true,
  exportable = true,
  refreshable = true,
  addButton = null,
  onRefresh = null,
  onExport = null,
  searchPlaceholder = 'Tìm kiếm...',
  title = null,
  className = '',
  ...props
}) => {
  const [searchText, setSearchText] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  // Filter data based on search text
  React.useEffect(() => {
    if (!searchText) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, searchText]);

  const tableActions = (
    <div className="flex gap-2 mb-4">
      {searchable && (
        <Input
          placeholder={searchPlaceholder}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs"
          allowClear
        />
      )}
      
      {filterable && (
        <Button icon={<FilterOutlined />}>
          Lọc
        </Button>
      )}
      
      {exportable && onExport && (
        <Button icon={<ExportOutlined />} onClick={onExport}>
          Xuất Excel
        </Button>
      )}
      
      {refreshable && onRefresh && (
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          Làm mới
        </Button>
      )}
      
      {addButton && addButton}
    </div>
  );

  return (
    <Card title={title} className={className}>
      {tableActions}
      <Table
        dataSource={filteredData}
        columns={columns}
        loading={loading}
        rowSelection={rowSelection}
        pagination={pagination ? {
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} mục`,
          pageSizeOptions: ['10', '20', '50', '100']
        } : false}
        scroll={{ x: 'max-content' }}
        {...props}
      />
    </Card>
  );
};

/**
 * Reusable Form Modal Component
 */
export const FormModal = ({
  visible,
  title,
  children,
  onOk,
  onCancel,
  okText = 'Lưu',
  cancelText = 'Hủy',
  loading = false,
  width = 600,
  formRef = null,
  ...props
}) => {
  const handleOk = async () => {
    if (formRef?.current) {
      try {
        const values = await formRef.current.validateFields();
        onOk && onOk(values);
      } catch (error) {
        console.error('Form validation failed:', error);
      }
    } else {
      onOk && onOk();
    }
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={loading}
      width={width}
      destroyOnClose
      {...props}
    >
      {children}
    </Modal>
  );
};

/**
 * Status Badge Component
 */
export const StatusBadge = ({ status, type = 'default', ...props }) => {
  const statusConfig = {
    active: { color: 'green', text: 'Hoạt động' },
    inactive: { color: 'red', text: 'Không hoạt động' },
    pending: { color: 'orange', text: 'Chờ xử lý' },
    approved: { color: 'blue', text: 'Đã duyệt' },
    rejected: { color: 'red', text: 'Từ chối' },
    completed: { color: 'green', text: 'Hoàn thành' },
    cancelled: { color: 'default', text: 'Đã hủy' },
    available: { color: 'green', text: 'Có sẵn' },
    expired: { color: 'red', text: 'Hết hạn' },
    used: { color: 'blue', text: 'Đã sử dụng' }
  };

  const config = statusConfig[status] || { color: 'default', text: status };

  if (type === 'tag') {
    return <Tag color={config.color} {...props}>{config.text}</Tag>;
  }

  return <Badge status={config.color} text={config.text} {...props} />;
};

/**
 * Loading Wrapper Component
 */
export const LoadingWrapper = ({ 
  loading = false, 
  children, 
  tip = 'Đang tải...', 
  size = 'default',
  className = ''
}) => {
  if (loading) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <Spin size={size} tip={tip} />
      </div>
    );
  }

  return children;
};

/**
 * Empty State Component
 */
export const EmptyState = ({ 
  description = 'Không có dữ liệu', 
  action = null,
  image = null,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Empty
        image={image}
        description={description}
      >
        {action}
      </Empty>
    </div>
  );
};

/**
 * Stats Card Component
 */
export const StatsCard = ({
  title,
  value,
  icon,
  trend = null,
  trendType = 'up', // 'up', 'down', 'neutral'
  color = 'blue',
  loading = false,
  className = ''
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className={`${colorClasses[color]} ${className}`} loading={loading}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className={`text-sm ${trendColors[trendType]} mt-1`}>
              {trend}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-3xl opacity-80">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * Page Header Component
 */
export const PageHeader = ({
  title,
  subtitle = null,
  actions = null,
  breadcrumb = null,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {breadcrumb}
      <div className="flex justify-between items-start mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Filter Panel Component
 */
export const FilterPanel = ({
  filters = [],
  onFilterChange,
  onReset,
  className = ''
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues, allValues) => {
    onFilterChange && onFilterChange(allValues);
  };

  const handleReset = () => {
    form.resetFields();
    onReset && onReset();
  };

  return (
    <Card className={className} size="small">
      <Form
        form={form}
        layout="inline"
        onValuesChange={handleValuesChange}
        className="flex flex-wrap gap-4"
      >
        {filters.map((filter, index) => (
          <Form.Item
            key={index}
            name={filter.name}
            label={filter.label}
            className="mb-2"
          >
            {filter.type === 'select' ? (
              <Select
                placeholder={filter.placeholder}
                style={{ width: filter.width || 150 }}
                allowClear
              >
                {filter.options?.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ) : filter.type === 'dateRange' ? (
              <RangePicker
                placeholder={filter.placeholder}
                style={{ width: filter.width || 250 }}
              />
            ) : (
              <Input
                placeholder={filter.placeholder}
                style={{ width: filter.width || 150 }}
                allowClear
              />
            )}
          </Form.Item>
        ))}
        
        <Form.Item className="mb-2">
          <Button onClick={handleReset}>
            Đặt lại
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

/**
 * Action Button Group Component
 */
export const ActionButtons = ({
  actions = [],
  size = 'small',
  className = ''
}) => {
  const defaultActions = {
    view: { icon: <EyeOutlined />, type: 'primary', ghost: true },
    edit: { icon: <EditOutlined />, type: 'default' },
    delete: { icon: <DeleteOutlined />, type: 'primary', danger: true }
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {actions.map((action, index) => {
        const config = defaultActions[action.type] || {};
        return (
          <Tooltip key={index} title={action.tooltip}>
            <Button
              size={size}
              icon={action.icon || config.icon}
              type={config.type}
              danger={config.danger}
              ghost={config.ghost}
              onClick={action.onClick}
              disabled={action.disabled}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

/**
 * Notification Component
 */
export const NotificationCard = ({
  type = 'info',
  title,
  message,
  time,
  read = false,
  onClick,
  onMarkRead,
  onDelete,
  className = ''
}) => {
  const typeConfig = {
    info: { color: 'blue', icon: '🔵' },
    success: { color: 'green', icon: '✅' },
    warning: { color: 'orange', icon: '⚠️' },
    error: { color: 'red', icon: '❌' }
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <Card
      size="small"
      className={`cursor-pointer transition-all hover:shadow-md ${
        read ? 'opacity-60' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-lg">{config.icon}</span>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 mb-2">{message}</p>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>
        
        <div className="flex gap-1 ml-2">
          {!read && onMarkRead && (
            <Button
              size="small"
              type="text"
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead();
              }}
            >
              Đánh dấu đã đọc
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

/**
 * Progress Card Component
 */
export const ProgressCard = ({
  title,
  current,
  total,
  unit = '',
  color = 'blue',
  showPercentage = true,
  className = ''
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <Card className={className}>
      <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{current} {unit}</span>
          <span>{total} {unit}</span>
        </div>
        <Progress
          percent={percentage}
          strokeColor={color}
          size="small"
          showInfo={showPercentage}
        />
      </div>
    </Card>
  );
};

// Export all components
export default {
  DataTable,
  FormModal,
  StatusBadge,
  LoadingWrapper,
  EmptyState,
  StatsCard,
  PageHeader,
  FilterPanel,
  ActionButtons,
  NotificationCard,
  ProgressCard
};
