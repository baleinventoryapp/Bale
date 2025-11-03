[
  {
    "table_name": "barcode_batch_items",
    "table_definition": "\nCREATE TABLE barcode_batch_items (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  batch_id uuid NOT NULL,\n  stock_unit_id uuid NOT NULL\n);\n-- Foreign Keys:\n-- FK: batch_id -> barcode_batches(id),\n  FK: stock_unit_id -> stock_units(id)"
  },
  {
    "table_name": "barcode_batches",
    "table_definition": "\nCREATE TABLE barcode_batches (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  warehouse_id uuid NOT NULL,\n  batch_name character varying(100) NOT NULL,\n  fields_selected ARRAY,\n  pdf_url text,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid\n);\n-- Foreign Keys:\n-- FK: warehouse_id -> warehouses(id),\n  FK: created_by -> users(id),\n  FK: company_id -> companies(id),\n  FK: modified_by -> users(id)"
  },
  {
    "table_name": "catalog_configurations",
    "table_definition": "\nCREATE TABLE catalog_configurations (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  catalog_name character varying(100),\n  logo_url text,\n  primary_color character varying(7),\n  secondary_color character varying(7),\n  font_family character varying(50),\n  favicon_url text,\n  show_fields jsonb,\n  filter_options jsonb,\n  sort_options jsonb,\n  terms_conditions text,\n  return_policy text,\n  privacy_policy text,\n  contact_phone character varying(15),\n  contact_email character varying(100),\n  contact_address text,\n  accepting_orders boolean DEFAULT false,\n  domain_slug character varying(50),\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid\n);\n-- Foreign Keys:\n-- FK: created_by -> users(id),\n  FK: modified_by -> users(id),\n  FK: company_id -> companies(id)"
  },
  {
    "table_name": "companies",
    "table_definition": "\nCREATE TABLE companies (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  name character varying(100) NOT NULL,\n  address_line1 character varying(255),\n  address_line2 character varying(255),\n  city character varying(100),\n  state character varying(100),\n  country character varying(100) DEFAULT 'India'::character varying,\n  pin_code character varying(10),\n  business_type character varying(50),\n  gst_number character varying(15),\n  pan_number character varying(10),\n  logo_url text,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);"
  },
  {
    "table_name": "company_performance_metrics",
    "table_definition": "\nCREATE TABLE company_performance_metrics (\n  company_id uuid,\n  company_name character varying(100),\n  total_warehouses bigint,\n  total_users bigint,\n  total_partners bigint,\n  total_products bigint,\n  total_stock_units bigint,\n  sales_orders_last_30_days bigint,\n  sales_value_last_30_days numeric,\n  inwards_last_30_days bigint,\n  outwards_last_30_days bigint,\n  job_works_last_30_days bigint,\n  pending_orders bigint,\n  active_job_works bigint,\n  catalog_status text,\n  domain_slug character varying(50),\n  last_activity_at timestamp with time zone\n);"
  },
  {
    "table_name": "comprehensive_order_fulfillment",
    "table_definition": "\nCREATE TABLE comprehensive_order_fulfillment (\n  company_id uuid,\n  sales_order_id uuid,\n  order_number character varying(50),\n  order_status character varying(20),\n  order_date date,\n  expected_delivery_date date,\n  customer_name text,\n  customer_company character varying(200),\n  customer_phone character varying(15),\n  fulfillment_warehouse character varying(100),\n  total_amount numeric,\n  advance_amount numeric,\n  discount_percentage numeric,\n  total_required_qty numeric,\n  total_dispatched_qty numeric,\n  total_pending_qty numeric,\n  fulfillment_percentage numeric,\n  total_dispatches bigint,\n  active_dispatches bigint,\n  linked_job_works bigint,\n  completed_job_works bigint,\n  last_activity_at timestamp with time zone\n);"
  },
  {
    "table_name": "goods_inward_stock_units",
    "table_definition": "\nCREATE TABLE goods_inward_stock_units (\n  inward_id uuid,\n  inward_number character varying(50),\n  inward_date date,\n  stock_unit_id uuid,\n  unit_number character varying(100),\n  qr_code text,\n  remaining_quantity numeric,\n  quality_grade text,\n  location_description text,\n  status character varying(20),\n  manufacturing_date date,\n  barcode_generated boolean,\n  product_name character varying(200),\n  material character varying(50),\n  color character varying(50),\n  measuring_unit character varying(20)\n);"
  },
  {
    "table_name": "goods_inwards",
    "table_definition": "\nCREATE TABLE goods_inwards (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  warehouse_id uuid NOT NULL,\n  inward_number character varying(50) NOT NULL,\n  inward_type character varying(20) NOT NULL,\n  sales_order_id uuid,\n  job_work_id uuid,\n  other_reason text,\n  partner_id uuid,\n  from_warehouse_id uuid,\n  agent_id uuid,\n  inward_date date NOT NULL DEFAULT CURRENT_DATE,\n  invoice_number character varying(50),\n  invoice_amount numeric,\n  transport_details text,\n  notes text,\n  attachments ARRAY,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: job_work_id -> job_works(id),\n  FK: modified_by -> users(id),\n  FK: created_by -> users(id),\n  FK: agent_id -> partners(id),\n  FK: from_warehouse_id -> warehouses(id),\n  FK: partner_id -> partners(id),\n  FK: sales_order_id -> sales_orders(id),\n  FK: warehouse_id -> warehouses(id),\n  FK: company_id -> companies(id)"
  },
  {
    "table_name": "goods_outward_items",
    "table_definition": "\nCREATE TABLE goods_outward_items (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  outward_id uuid NOT NULL,\n  stock_unit_id uuid NOT NULL,\n  quantity numeric NOT NULL,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now()\n);\n-- Foreign Keys:\n-- FK: outward_id -> goods_outwards(id),\n  FK: company_id -> companies(id),\n  FK: stock_unit_id -> stock_units(id)"
  },
  {
    "table_name": "goods_outwards",
    "table_definition": "\nCREATE TABLE goods_outwards (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  warehouse_id uuid NOT NULL,\n  outward_number character varying(50) NOT NULL,\n  outward_type character varying(20) NOT NULL,\n  sales_order_id uuid,\n  job_work_id uuid,\n  other_reason text,\n  partner_id uuid,\n  to_warehouse_id uuid,\n  agent_id uuid,\n  outward_date date NOT NULL DEFAULT CURRENT_DATE,\n  due_date date,\n  invoice_number character varying(50),\n  invoice_amount numeric,\n  transport_details text,\n  is_cancelled boolean DEFAULT false,\n  cancelled_at timestamp with time zone,\n  cancelled_by uuid,\n  cancellation_reason text,\n  notes text,\n  attachments ARRAY,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: modified_by -> users(id),\n  FK: created_by -> users(id),\n  FK: warehouse_id -> warehouses(id),\n  FK: company_id -> companies(id),\n  FK: cancelled_by -> users(id),\n  FK: agent_id -> partners(id),\n  FK: partner_id -> partners(id),\n  FK: to_warehouse_id -> warehouses(id),\n  FK: job_work_id -> job_works(id),\n  FK: sales_order_id -> sales_orders(id)"
  },
  {
    "table_name": "inventory_movement_audit_trail",
    "table_definition": "\nCREATE TABLE inventory_movement_audit_trail (\n  movement_type text,\n  company_id uuid,\n  warehouse_id uuid,\n  warehouse_name character varying(100),\n  transaction_id uuid,\n  transaction_number character varying(50),\n  transaction_date date,\n  partner_name text,\n  partner_type character varying,\n  inward_type character varying(20),\n  sales_order_id uuid,\n  job_work_id uuid,\n  other_reason text,\n  items_count bigint,\n  total_quantity numeric,\n  invoice_amount numeric,\n  created_by_user_id uuid,\n  created_at timestamp with time zone,\n  direction text\n);"
  },
  {
    "table_name": "inventory_summary",
    "table_definition": "\nCREATE TABLE inventory_summary (\n  company_id uuid,\n  product_id uuid,\n  product_name character varying(200),\n  product_number character varying(50),\n  material character varying(50),\n  color character varying(50),\n  warehouse_id uuid,\n  warehouse_name character varying(100),\n  total_units bigint,\n  in_stock_units bigint,\n  dispatched_units bigint,\n  removed_units bigint,\n  total_quantity numeric,\n  in_stock_quantity numeric,\n  measuring_unit character varying(20)\n);"
  },
  {
    "table_name": "invites",
    "table_definition": "\nCREATE TABLE invites (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  token character varying(255) NOT NULL,\n  company_id uuid NOT NULL,\n  role character varying(20) NOT NULL,\n  warehouse_id uuid,\n  used_at timestamp with time zone,\n  used_by_user_id uuid,\n  expires_at timestamp with time zone NOT NULL,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid\n);\n-- Foreign Keys:\n-- FK: used_by_user_id -> users(id),\n  FK: company_id -> companies(id),\n  FK: warehouse_id -> warehouses(id)"
  },
  {
    "table_name": "job_work_details",
    "table_definition": "\nCREATE TABLE job_work_details (\n  id uuid,\n  company_id uuid,\n  warehouse_id uuid,\n  job_number character varying(50),\n  job_type text,\n  vendor_id uuid,\n  agent_id uuid,\n  start_date date,\n  due_date date,\n  sales_order_id uuid,\n  status character varying(20),\n  status_changed_at timestamp with time zone,\n  status_changed_by uuid,\n  status_notes text,\n  notes text,\n  attachments ARRAY,\n  created_at timestamp with time zone,\n  updated_at timestamp with time zone,\n  created_by uuid,\n  modified_by uuid,\n  deleted_at timestamp with time zone,\n  vendor_name text,\n  vendor_company character varying(200),\n  vendor_phone character varying(15),\n  warehouse_name character varying(100),\n  agent_name text,\n  raw_materials_count bigint,\n  total_raw_required numeric,\n  total_raw_dispatched numeric,\n  total_raw_pending numeric,\n  finished_goods_count bigint,\n  total_finished_expected numeric,\n  total_finished_received numeric,\n  total_finished_pending numeric,\n  completion_percentage numeric\n);"
  },
  {
    "table_name": "job_work_finished_goods",
    "table_definition": "\nCREATE TABLE job_work_finished_goods (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  job_work_id uuid NOT NULL,\n  product_id uuid NOT NULL,\n  expected_quantity numeric NOT NULL,\n  received_quantity numeric DEFAULT 0,\n  pending_quantity numeric,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now()\n);\n-- Foreign Keys:\n-- FK: job_work_id -> job_works(id),\n  FK: company_id -> companies(id),\n  FK: product_id -> products(id)"
  },
  {
    "table_name": "job_work_progress",
    "table_definition": "\nCREATE TABLE job_work_progress (\n  company_id uuid,\n  job_work_id uuid,\n  job_number character varying(50),\n  job_type text,\n  status character varying(20),\n  start_date date,\n  due_date date,\n  vendor_name text,\n  vendor_company character varying(200),\n  warehouse_name character varying(100),\n  raw_required_qty numeric,\n  raw_dispatched_qty numeric,\n  raw_pending_qty numeric,\n  finished_expected_qty numeric,\n  finished_received_qty numeric,\n  finished_pending_qty numeric,\n  completion_percentage numeric\n);"
  },
  {
    "table_name": "job_work_raw_materials",
    "table_definition": "\nCREATE TABLE job_work_raw_materials (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  job_work_id uuid NOT NULL,\n  product_id uuid NOT NULL,\n  required_quantity numeric NOT NULL,\n  dispatched_quantity numeric DEFAULT 0,\n  pending_quantity numeric,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now()\n);\n-- Foreign Keys:\n-- FK: company_id -> companies(id),\n  FK: product_id -> products(id),\n  FK: job_work_id -> job_works(id)"
  },
  {
    "table_name": "job_works",
    "table_definition": "\nCREATE TABLE job_works (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  warehouse_id uuid NOT NULL,\n  job_number character varying(50) NOT NULL,\n  job_type text NOT NULL,\n  vendor_id uuid NOT NULL,\n  agent_id uuid,\n  start_date date NOT NULL,\n  due_date date,\n  sales_order_id uuid,\n  status character varying(20) NOT NULL DEFAULT 'in_progress'::character varying,\n  status_changed_at timestamp with time zone,\n  status_changed_by uuid,\n  status_notes text,\n  notes text,\n  attachments ARRAY,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: status_changed_by -> users(id),\n  FK: sales_order_id -> sales_orders(id),\n  FK: agent_id -> partners(id),\n  FK: vendor_id -> partners(id),\n  FK: company_id -> companies(id),\n  FK: warehouse_id -> warehouses(id),\n  FK: modified_by -> users(id),\n  FK: created_by -> users(id)"
  },
  {
    "table_name": "partner_transaction_summary",
    "table_definition": "\nCREATE TABLE partner_transaction_summary (\n  company_id uuid,\n  partner_id uuid,\n  partner_name text,\n  company_name character varying(200),\n  partner_type character varying(20),\n  phone_number character varying(15),\n  email character varying(100),\n  total_sales_orders bigint,\n  total_sales_value numeric,\n  completed_sales_orders bigint,\n  total_job_works bigint,\n  completed_job_works bigint,\n  goods_outward_to bigint,\n  goods_outward_via_agent bigint,\n  goods_inward_from bigint,\n  last_transaction_at timestamp with time zone,\n  days_since_last_activity integer\n);"
  },
  {
    "table_name": "partners",
    "table_definition": "\nCREATE TABLE partners (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  first_name character varying(50) NOT NULL,\n  last_name character varying(50) NOT NULL,\n  company_name character varying(200),\n  phone_number character varying(15) NOT NULL,\n  email character varying(100),\n  partner_type character varying(20) NOT NULL,\n  gst_number character varying(15),\n  pan_number character varying(10),\n  address_line1 character varying(255),\n  address_line2 character varying(255),\n  city character varying(100),\n  state character varying(100),\n  country character varying(100) DEFAULT 'India'::character varying,\n  pin_code character varying(10),\n  notes text,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: modified_by -> users(id),\n  FK: company_id -> companies(id),\n  FK: created_by -> users(id)"
  },
  {
    "table_name": "product_variant_items",
    "table_definition": "\nCREATE TABLE product_variant_items (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  variant_id uuid NOT NULL,\n  product_id uuid NOT NULL,\n  variant_value character varying(100) NOT NULL,\n  display_order integer DEFAULT 0\n);\n-- Foreign Keys:\n-- FK: product_id -> products(id),\n  FK: variant_id -> product_variants(id)"
  },
  {
    "table_name": "product_variants",
    "table_definition": "\nCREATE TABLE product_variants (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  variant_name character varying(100) NOT NULL,\n  variant_type character varying(50),\n  display_order integer DEFAULT 0,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now()\n);\n-- Foreign Keys:\n-- FK: company_id -> companies(id)"
  },
  {
    "table_name": "products",
    "table_definition": "\nCREATE TABLE products (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  product_number character varying(50) NOT NULL,\n  name character varying(200) NOT NULL,\n  show_on_catalog boolean DEFAULT true,\n  material character varying(50),\n  color character varying(50),\n  color_hex character varying(7),\n  gsm integer,\n  thread_count_cm integer,\n  tags ARRAY,\n  measuring_unit character varying(20) NOT NULL,\n  cost_price_per_unit numeric,\n  selling_price_per_unit numeric,\n  min_stock_alert boolean DEFAULT false,\n  min_stock_threshold integer DEFAULT 0,\n  hsn_code character varying(20),\n  notes text,\n  product_images ARRAY,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: created_by -> users(id),\n  FK: modified_by -> users(id),\n  FK: company_id -> companies(id)"
  },
  {
    "table_name": "sales_order_items",
    "table_definition": "\nCREATE TABLE sales_order_items (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  sales_order_id uuid NOT NULL,\n  product_id uuid NOT NULL,\n  required_quantity numeric NOT NULL,\n  dispatched_quantity numeric DEFAULT 0,\n  pending_quantity numeric,\n  unit_rate numeric,\n  line_total numeric,\n  notes text,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now()\n);\n-- Foreign Keys:\n-- FK: company_id -> companies(id),\n  FK: sales_order_id -> sales_orders(id),\n  FK: product_id -> products(id)"
  },
  {
    "table_name": "sales_order_status",
    "table_definition": "\nCREATE TABLE sales_order_status (\n  company_id uuid,\n  sales_order_id uuid,\n  order_number character varying(50),\n  status character varying(20),\n  order_date date,\n  expected_delivery_date date,\n  customer_name text,\n  customer_company character varying(200),\n  total_amount numeric,\n  total_items bigint,\n  total_required_qty numeric,\n  total_dispatched_qty numeric,\n  total_pending_qty numeric,\n  completion_percentage numeric\n);"
  },
  {
    "table_name": "sales_orders",
    "table_definition": "\nCREATE TABLE sales_orders (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  order_number character varying(50) NOT NULL,\n  customer_id uuid NOT NULL,\n  agent_id uuid,\n  order_date date NOT NULL DEFAULT CURRENT_DATE,\n  expected_delivery_date date,\n  fulfillment_warehouse_id uuid,\n  advance_amount numeric DEFAULT 0,\n  discount_percentage numeric DEFAULT 0,\n  total_amount numeric DEFAULT 0,\n  status character varying(20) NOT NULL DEFAULT 'approval_pending'::character varying,\n  status_changed_at timestamp with time zone,\n  status_changed_by uuid,\n  status_notes text,\n  notes text,\n  attachments ARRAY,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: customer_id -> partners(id),\n  FK: fulfillment_warehouse_id -> warehouses(id),\n  FK: status_changed_by -> users(id),\n  FK: created_by -> users(id),\n  FK: modified_by -> users(id),\n  FK: company_id -> companies(id),\n  FK: agent_id -> partners(id)"
  },
  {
    "table_name": "stock_units",
    "table_definition": "\nCREATE TABLE stock_units (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  product_id uuid NOT NULL,\n  warehouse_id uuid NOT NULL,\n  unit_number character varying(100) NOT NULL,\n  qr_code text,\n  remaining_quantity numeric NOT NULL,\n  initial_quantity numeric NOT NULL,\n  supplier_number character varying(100),\n  quality_grade text,\n  location_description text,\n  status character varying(20) NOT NULL DEFAULT 'in_stock'::character varying,\n  manufacturing_date date,\n  created_from_inward_id uuid,\n  notes text,\n  barcode_generated boolean DEFAULT false,\n  barcode_generated_at timestamp with time zone,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid NOT NULL,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: product_id -> products(id),\n  FK: created_from_inward_id -> goods_inwards(id),\n  FK: warehouse_id -> warehouses(id),\n  FK: company_id -> companies(id),\n  FK: created_by -> users(id),\n  FK: modified_by -> users(id)"
  },
  {
    "table_name": "users",
    "table_definition": "\nCREATE TABLE users (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  first_name character varying(50) NOT NULL,\n  last_name character varying(50) NOT NULL,\n  phone_number character varying(15),\n  email character varying(100),\n  profile_image_url text,\n  additional_notes text,\n  role character varying(20) NOT NULL,\n  warehouse_id uuid,\n  is_active boolean DEFAULT true,\n  auth_user_id uuid,\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: company_id -> companies(id),\n  FK: warehouse_id -> warehouses(id)"
  },
  {
    "table_name": "warehouse_activity_dashboard",
    "table_definition": "\nCREATE TABLE warehouse_activity_dashboard (\n  company_id uuid,\n  warehouse_id uuid,\n  warehouse_name character varying(100),\n  total_stock_units bigint,\n  available_units bigint,\n  dispatched_units bigint,\n  inwards_last_30_days bigint,\n  outwards_last_30_days bigint,\n  job_works_last_30_days bigint,\n  active_job_works bigint,\n  pending_sales_orders bigint,\n  units_without_barcodes bigint,\n  assigned_staff_count bigint,\n  last_activity_at timestamp with time zone\n);"
  },
  {
    "table_name": "warehouses",
    "table_definition": "\nCREATE TABLE warehouses (\n  id uuid NOT NULL DEFAULT uuid_generate_v4(),\n  company_id uuid NOT NULL,\n  name character varying(100) NOT NULL,\n  address_line1 character varying(255),\n  address_line2 character varying(255),\n  city character varying(100),\n  state character varying(100),\n  country character varying(100) DEFAULT 'India'::character varying,\n  pin_code character varying(10),\n  created_at timestamp with time zone NOT NULL DEFAULT now(),\n  updated_at timestamp with time zone NOT NULL DEFAULT now(),\n  created_by uuid,\n  modified_by uuid,\n  deleted_at timestamp with time zone\n);\n-- Foreign Keys:\n-- FK: modified_by -> users(id),\n  FK: created_by -> users(id),\n  FK: company_id -> companies(id)"
  }
]