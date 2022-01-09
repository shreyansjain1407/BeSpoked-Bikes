#Table creation
#Products
CREATE TABLE `profisee`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `manufacturer` VARCHAR(50) NOT NULL,
  `purchase_price` INT NOT NULL,
  `sale_price` INT NOT NULL,
  `quantity` INT NOT NULL,
  `commissioni` INT NOT NULL,
  PRIMARY KEY (`product_id`));

#Salesperson
CREATE TABLE `profisee`.`salesperson` (
  `sp_id` INT NOT NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NULL,
  `address` VARCHAR(128) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `start_date` DATE NOT NULL,
  `termination_date` DATE NULL,
  `manager` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`sp_id`));

#Customer
CREATE TABLE `profisee`.`customer` (
  `cust_id` INT NOT NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NULL,
  `address` VARCHAR(128) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `start_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (`cust_id`));

#Discount
CREATE TABLE `profisee`.`discount` (
  `disc_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `begin_date` DATE NULL,
  `end_date` DATE NULL,
  `discount` INT NOT NULL,
  PRIMARY KEY (`disc_id`),
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `profisee`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


#Triggers Used:
#Trigger to prevent sale of bikes with quantity 0
CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`sales_insufficient_qty` BEFORE INSERT ON `sales` FOR EACH ROW
BEGIN
	DECLARE msg varchar(100);
	IF (select `quantity` from `products` where `product_id` = NEW.product_id) > 0 THEN
		update `products` set `quantity` = `quantity` - 1 WHERE `product_id` = NEW.product_id;
    ELSE
		set msg = concat('Insufficient Quantity');
        signal sqlstate '45000' set message_text = msg;
	end if;
END

#Trigger to prevent addition of bikes with quantity less than 0
CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`products_checkQtyLessThanZero` BEFORE INSERT ON `products` FOR EACH ROW
BEGIN
	declare msg varchar(100);
    if(NEW.quantity < 0) then
		set msg = concat("The quantity of a product cannot be less than 0");
        signal sqlstate '45000' set message_text = msg;
	end if;
END

CREATE DEFINER=`root`@`localhost` TRIGGER `sales_checkCustSalespAtInsert` BEFORE INSERT ON `sales` FOR EACH ROW BEGIN
	declare msg varchar(100);
    if NEW.cust_id NOT IN (SELECT cust_id from customer) then
		set msg = concat('Customer does not exist');
        signal sqlstate '45000' set message_text = msg;
	elseif NEW.sp_id NOT IN (SELECT sp_id from salesperson) then
		set msg = concat('Salesperson does not exist');
        signal sqlstate '45000' set message_text = msg;
	end if;
END

#Trigger to prevent addition of bikes with quantity less than 0
CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`products_checkQtyLessThanZeroUpdate` BEFORE UPDATE ON `products` FOR EACH ROW
BEGIN
	declare msg varchar(100);
    if(NEW.quantity < 0) then
		set msg = concat("The quantity of a product cannot be less than 0");
        signal sqlstate '45000' set message_text = msg;
	end if;
END

#Trigger on salesperson, termination date cannot be less than start date
CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`salesperson_terminationCheckAtInsert` BEFORE INSERT ON `salesperson` FOR EACH ROW
BEGIN
	declare msg varchar(100);
    if(NEW.termination_date != null AND NEW.start_date > NEW.termination_date) then
		set msg = concat("Termination date Can't be earlier than start date");
        signal sqlstate '45000' set message_text = msg;
	end if;
END

#Trigger on salesperson at update
CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`salesperson_terminationCheckAtUpdate` BEFORE UPDATE ON `salesperson` FOR EACH ROW
BEGIN
	declare msg varchar(100);
    if(NEW.termination_date != null AND NEW.start_date > NEW.termination_date) then
		set msg = concat("Termination date Can't be earlier than start date");
        signal sqlstate '45000' set message_text = msg;
	end if;
END

#Trigger for discount start and end date
CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`discount_startEndDateValidationAtInsert` BEFORE INSERT ON `discount` FOR EACH ROW
BEGIN
	declare msg varchar(100);
    if(NEW.end_date != null AND NEW.begin_date > NEW.end_date) then
		set msg = concat("End date Can't be earlier than start date");
        signal sqlstate '45000' set message_text = msg;
	end if;
END

CREATE DEFINER = CURRENT_USER TRIGGER `profisee`.`discount_startEndDateValidationAtUpdate` BEFORE UPDATE ON `discount` FOR EACH ROW
BEGIN
	declare msg varchar(100);
    if(NEW.end_date != null AND NEW.begin_date > NEW.end_date) then
		set msg = concat("End date Can't be earlier than start date");
        signal sqlstate '45000' set message_text = msg;
	end if;
END

#View, utilized for the display of all the sales data 
SELECT Z.name as product_name, Z.disc_price as sale_price, Z.c_name as Customer_Name, Z.sale_date, concat(SP.f_name, " ", SP.l_name) as Salesperson, (Z.disc_price*Z.commission)/100 as Commission
FROM (SELECT Y.name, Y.sale_price, Y.c_name, Y.sale_date, Y.sp_id, Y.commission,
case
when Y.sale_date between Y.begin_date and Y.end_date
then (Y.sale_price*Y.discount/100)
else Y.sale_price
end as disc_price
FROM (SELECT X.name, X.commission, X.sale_price , X.sp_id, concat(X.f_name, ' ', X.l_name) as c_name, X.sale_date, X.product_id, D.begin_date, D.end_date, D.discount FROM
(SELECT S.name, S.sale_price, S.commission, S.sp_id, C.f_name, C.l_name , S.sale_date ,S.product_id
FROM customer C, (SELECT name, sale_price, commission, sp_id, sale_date, cust_id, product_id FROM products Natural Join sales) S
WHERE S.cust_id = C.cust_id ) X 
LEFT OUTER JOIN discount D ON X.product_id = D.product_id) Y) Z, salesperson SP
WHERE SP.sp_ID = Z.sp_id;

-- Query used for the Commission Report
SELECT REP.Salesperson, SUM(Commission)
FROM (SELECT Z.name as product_name, Z.disc_price as sale_price, Z.c_name as Customer_Name, Z.sale_date, concat(SP.f_name, " ", SP.l_name) as Salesperson, (Z.disc_price*Z.commission)/100 as Commission
FROM (SELECT Y.name, Y.sale_price, Y.c_name, Y.sale_date, Y.sp_id, Y.commission,
case
when Y.sale_date between Y.begin_date and Y.end_date
then (Y.sale_price*Y.discount/100)
else Y.sale_price
end as disc_price
FROM (SELECT X.name, X.commission, X.sale_price , X.sp_id, concat(X.f_name, ' ', X.l_name) as c_name, X.sale_date, X.product_id, D.begin_date, D.end_date, D.discount FROM
(SELECT S.name, S.sale_price, S.commission, S.sp_id, C.f_name, C.l_name , S.sale_date ,S.product_id
FROM customer C, (SELECT name, sale_price, commission, sp_id, sale_date, cust_id, product_id FROM products Natural Join sales) S
WHERE S.cust_id = C.cust_id ) X 
LEFT OUTER JOIN discount D ON X.product_id = D.product_id) Y) Z, salesperson SP
WHERE SP.sp_ID = Z.sp_id) REP
WHERE REP.sale_date BETWEEN (?) AND (?)
GROUP BY REP.Salesperson