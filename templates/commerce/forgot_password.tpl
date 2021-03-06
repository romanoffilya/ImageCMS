<div class="fancy enter_form"> 
    <h1>{lang('lang_forgot_password')}</h1>
    <!--<div id="titleExt">{widget('path')}<span class="ext">{lang('lang_forgot_password')}</span></div>-->

    {if validation_errors() OR $info_message}
        <div class="errors">
            {validation_errors()}
            {$info_message}
        </div>
    {/if}

    <form action="" class="form" method="post">

        <div class="clear"></div>

        <div class="fieldName">{lang('s_email')}</div>
        <div class="field">
            <input type="text" size="30" name="email" id="login" />
        </div>
        <div class="clear"></div>

        <div class="fieldName"></div>
        <div class="field">
            
            <div class="p-t_19 t-a_c">
                <div class="buttons button_middle_blue">
                    <input type="submit" value="{lang('lang_submit')}">
                </div>
            </div>
        </div>
        <div class="clear"></div>

        <div class="fieldName"></div>
        <div class="field t-a_c p-t_19">
            <a href="{site_url('auth/')}" class="auth_me">{lang('s_log_out')}</a>
            &nbsp;
            <a href="{site_url('auth/register')}" class="reg_me">{lang('lang_register')}</a>
        </div>
        <div class="clear"></div>
        {form_csrf()}
    </form>
</div>