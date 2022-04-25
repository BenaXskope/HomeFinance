from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "is_staff", "is_superuser")
    list_display_links = ("email",)
    list_editable = ("is_staff", "is_superuser")

    fieldsets = (
        (None, {
            "fields": (("email", "password"),)
        }),
        (None, {
            "fields": (("last_name", "first_name"),)
        })
    )

    def get_user(self, obj):
        return obj.user.email

    get_user.short_description = "Пользователь"