



-- CREATE TABLE User_Type (
 
--    USER_TYPE_ID INT NOT NULL PRIMARY KEY,
--    USER_TYPE_EN VARCHAR(25) NOT NULL,
--    USER_TYPE_AR VARCHAR(25) NOT NULL

-- )


-- delete from user;

-- CREATE TABLE User (
--     NATIONAL_ID INT NOT NULL,
--     FIRST_NAME VARCHAR(25) NOT NULL,
--     FATHER_NAME VARCHAR(25) NOT NULL,
--     SURENAME VARCHAR(25) NOT NULL,
--     USER_TYPE INT NOT NULL,
--     PRIMARY KEY (NATIONAL_ID),
--     FOREIGN KEY fk_user_type(USER_TYPE) REFERENCES User_Type(USER_TYPE_ID) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- )

-- INSERT INTO User_Type (USER_TYPE_ID,USER_TYPE_EN,USER_TYPE_AR) VALUES (0001,'Administrator', 'مدير نظام') , (0010, 'Doctor','طبيب');
 


    -- Alter Table User Drop PRIMARY Key ON NATIONAL_ID;

--INSERT INTO User (NATIONAL_ID,FIRST_NAME,FATHER_NAME,SURENAME,USER_TYPE,EMAIL,MOBILE_NO,PASSWORD) VALUES (11993,'شفيق', 'خالد','عرادي',1,'shafiq.aradi@icloud.com','0916416709','a');


  
--alter table User_Type alter  USER_TYPE_ID AUTO_INCREMENT;
select user.first_name, user.father_name, user.surename, user.email, user_type.user_type_en, user_type.user_type_ar,user.password as 'كلمة' from USER left JOIN user_type on user.user_type = user_type.user_type_id;


--alter table user add PASSWORD NOT NULL VARCHAR

SELECT NATIONAL_ID FROM USER WHERE EMAIL = 'shafiq.aradi@icloud.com' AND PASSWORD = 'a'