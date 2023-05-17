/* ROLES */
insert into role_lookup ( name, description ) values ( 'member', 'default role. basic member. access to free features' );
insert into role_lookup ( name, description ) values ( 'premium', 'paid member. access to premium features' );
insert into role_lookup ( name, description ) values ( 'admin', 'administrator. access to admin only features' );

/* FEATURE FLAGS */
-- foreign key makes feature flags dependent on roles. they must be inserted after roles
insert into feature_flags ( name, description, is_enabled ) values ( 'premiumDashboardSwitch', 'a switch that changes state from basic to premium dashboard. brings up upgrade popup for basic members', CAST(0 as BIT) );
insert into feature_flags ( name, description, is_enabled, required_role ) values ( 'adminDashboardMenuItem', 'option in user menu that navigates to admin dashboard', CAST(1 as BIT), 3 );
